import { Accept } from 'react-dropzone';

/**
 * Converts the accepted file format object passed to Dropzone to a string ready to be placed on
 * the DOM to inform the user about which file types one can upload on the dropzone.
 *
 * @param fileFormatsAccepted passed to React Dropzone
 * @returns a string with all characters uppercase that represents all file supported types
 */
export function getFileFormatsPrintableString(fileFormatsAccepted: Accept) {
  const fileFormats = Object.values(fileFormatsAccepted);
  const fileFormatsStringified = fileFormats.map((fileFormat) => fileFormat.join(', ')).join(', ');

  return fileFormatsStringified.replaceAll('.', '').toUpperCase();
}
