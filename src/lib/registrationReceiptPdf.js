import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const NAVY = rgb(0.08, 0.16, 0.29);
const MUTED = rgb(0.34, 0.40, 0.49);
const ORANGE = rgb(0.94, 0.29, 0.08);
const BORDER = rgb(0.85, 0.88, 0.92);
const PALE = rgb(0.96, 0.97, 0.99);

function printable(value) {
  return String(value ?? '')
    .replace(/[₹]/g, 'INR ')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7e]/g, '-')
    .trim();
}

function wrapText(text, font, size, maxWidth) {
  const words = printable(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = '';
    let chunk = '';
    for (const char of word) {
      if (font.widthOfTextAtSize(chunk + char, size) > maxWidth && chunk) {
        lines.push(chunk);
        chunk = char;
      } else chunk += char;
    }
    line = chunk;
  }
  if (line) lines.push(line);
  return lines;
}

function formatDate(value, options) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', ...options }).format(date);
}

function money(amountPaise) {
  return `INR ${(Number(amountPaise) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export async function createRegistrationReceiptPdf(registration, { event: EVENT, kitPickup: KIT_PICKUP, site: SITE, pacerGroups: PACER_GROUPS, logoBytes }) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Registration receipt ${registration.reference}`);
  pdf.setAuthor(SITE.name);
  pdf.setSubject('Official marathon registration receipt and bib pass');
  pdf.setCreator(SITE.name);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const logo = await pdf.embedPng(logoBytes);
  const logoSize = logo.scale(Math.min(96 / logo.width, 42 / logo.height));
  const pages = [];
  let page;
  let y;
  const addPage = () => {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    pages.push(page);
    page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 7, width: PAGE_WIDTH, height: 7, color: ORANGE });
    page.drawImage(logo, { x: MARGIN, y: PAGE_HEIGHT - 64, width: logoSize.width, height: logoSize.height });
    page.drawText(printable(SITE.name.toUpperCase()), { x: 164, y: PAGE_HEIGHT - 39, size: 15, font: bold, color: NAVY });
    page.drawText('OFFICIAL REGISTRATION RECEIPT & BIB PASS', { x: 164, y: PAGE_HEIGHT - 56, size: 8, font: bold, color: ORANGE });
    page.drawLine({ start: { x: MARGIN, y: PAGE_HEIGHT - 76 }, end: { x: PAGE_WIDTH - MARGIN, y: PAGE_HEIGHT - 76 }, thickness: 1, color: BORDER });
    y = PAGE_HEIGHT - 105;
  };
  const ensureSpace = (height) => {
    if (y - height < 72) addPage();
  };
  addPage();
  const drawSection = (title) => {
    ensureSpace(32);
    page.drawRectangle({ x: MARGIN, y: y - 5, width: PAGE_WIDTH - 2 * MARGIN, height: 21, color: PALE });
    page.drawText(printable(title.toUpperCase()), { x: MARGIN + 9, y: y + 2, size: 9, font: bold, color: NAVY });
    y -= 27;
  };
  const drawField = (label, value, options = {}) => {
    const labelWidth = options.labelWidth ?? 130;
    const fontSize = options.fontSize ?? 9;
    const lines = wrapText(value, regular, fontSize, PAGE_WIDTH - 2 * MARGIN - labelWidth - 18);
    const safeLines = lines.length ? lines : ['-'];
    const height = Math.max(17, safeLines.length * 12 + 5);
    ensureSpace(height);
    page.drawText(printable(label), { x: MARGIN + 8, y, size: fontSize, font: bold, color: MUTED });
    safeLines.forEach((line, index) => {
      page.drawText(line, { x: MARGIN + labelWidth, y: y - index * 12, size: fontSize, font: regular, color: NAVY });
    });
    y -= height;
  };

  ensureSpace(30);
  page.drawText('REGISTRATION REFERENCE', { x: MARGIN + 8, y, size: 8, font: bold, color: MUTED });
  page.drawText(printable(registration.reference), { x: MARGIN + 145, y: y - 1, size: 13, font: bold, color: ORANGE });
  page.drawText('PAYMENT CONFIRMED', { x: PAGE_WIDTH - MARGIN - 112, y, size: 8, font: bold, color: rgb(0.08, 0.52, 0.32) });
  y -= 30;

  drawSection('Professional / participant race details');
  drawField('Participant', registration.runner.name);
  drawField('Category', registration.runner.category);
  drawField('B.I.B. number', registration.runner.bibNumber ?? 'Pending assignment', { fontSize: 11 });
  drawField('Assigned wave', registration.runner.wave || 'Not assigned');
  const pacer = PACER_GROUPS.find((item) => item.value === registration.runner.pacerGroup);
  drawField('Pace group', pacer?.title || 'Not selected');
  drawField('Registered contact', [registration.runner.email, registration.runner.mobile].filter(Boolean).join(' | '));

  drawSection(`Social registration / all passes active (${1 + registration.family.length})`);
  const participants = [
    { name: registration.runner.name, category: registration.runner.category, bib: registration.runner.bibNumber, label: 'Primary participant' },
    ...registration.family.map((member) => ({ name: member.name, category: member.category, bib: member.bibNumber, label: member.relationship })),
  ];
  participants.forEach((member) => {
    const details = `${member.label} | ${member.category} | Bib ${member.bib ?? 'Pending assignment'}`;
    drawField(member.name, details, { labelWidth: 150, fontSize: 8 });
  });

  drawSection('Event kit / race-day details');
  drawField('Race day', `${formatDate(EVENT.startISO, { day: '2-digit', month: 'long', year: 'numeric' })} | ${EVENT.timeLabel}`);
  drawField('Race venue', EVENT.address);
  drawField('Bib & kit collection', `${KIT_PICKUP.title} | ${KIT_PICKUP.dateLabel} | ${KIT_PICKUP.timeLabel} | ${KIT_PICKUP.venue}`);
  drawField('Collection instructions', KIT_PICKUP.note, { fontSize: 8 });

  drawSection('Payment receipt');
  drawField('Payment status', 'Confirmed');
  drawField('Amount paid', money(registration.payment.amountPaise ?? registration.amountPaise), { fontSize: 11 });
  if (registration.payment.paymentId) drawField('Payment transaction ID', registration.payment.paymentId, { fontSize: 8 });
  drawField('Payment method', registration.payment.method || '');
  drawField('Confirmation date', formatDate(registration.payment.paidAt, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }));

  pages.forEach((currentPage, index) => {
    currentPage.drawLine({ start: { x: MARGIN, y: 48 }, end: { x: PAGE_WIDTH - MARGIN, y: 48 }, thickness: 1, color: BORDER });
    currentPage.drawText(printable(SITE.name), { x: MARGIN, y: 32, size: 8, font: bold, color: NAVY });
    currentPage.drawText('Present this pass at the official bib and kit collection.', { x: MARGIN, y: 19, size: 7, font: regular, color: MUTED });
    currentPage.drawText(`Page ${index + 1} of ${pages.length}`, { x: PAGE_WIDTH - MARGIN - 48, y: 19, size: 7, font: regular, color: MUTED });
  });

  return pdf.save();
}
