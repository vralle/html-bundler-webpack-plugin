import whatsapp from '@images/icons/whatsapp.svg?from-js';
import whatsappInline from '@images/icons/whatsapp.svg?from-js&inline';
import whatsappInlineEscape from '@images/icons/whatsapp.svg?from-js&inline=escape';
import whatsappInlineBase64 from '@images/icons/whatsapp.svg?from-js&inline=base64';
import whatsappEmbed from '@images/icons/whatsapp.svg?from-js&dummy&embed';

import codeSlash from '@images/icons/code.svg?from-js';
import codeSlashInline from '@images/icons/code.svg?from-js&inline';
import codeSlashEmbed from '@images/icons/code.svg?from-js&dummy&embed';

import codeSlashRaw from '@images/icons/code.svg?from-js&raw';
import whatsappRaw from '@images/icons/whatsapp.svg?from-js&raw';

console.log('>> whatsapp (1.69 KB):\n', whatsapp); // filename
console.log('>> whatsappInline (1.69 KB)\n', whatsappInline); // force inline, result of generator.dataUrl()
console.log('>> whatsappInlineEscape (1.69 KB)\n', whatsappInlineEscape); // force inline as escaped data URL (result of generator.dataUrl())
console.log('>> whatsappInlineBase64 (1.69 KB)\n', whatsappInlineBase64); // force inline as base64-encoded data URL
console.log('>> whatsappEmbed (1.69 KB)\n', whatsappEmbed); // filename (ignore `embed` query in JS)

console.log('>> codeSlash (415 bytes)\n', codeSlash); // data URL, result of generator.dataUrl()
console.log('>> codeSlashInline (415 bytes)\n', codeSlashInline); // force inline, result of generator.dataUrl()
console.log('>> codeSlashEmbed (415 bytes)\n', codeSlashEmbed); // data URL, result of generator.dataUrl() (ignore `embed` query in JS)

console.log('>> whatsappRaw (1.69 KB):\n', whatsappRaw); // raw svg
console.log('>> codeSlashRaw (415 bytes)\n', codeSlashRaw); // raw svg
