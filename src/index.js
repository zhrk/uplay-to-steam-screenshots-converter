import JSZip from 'jszip';
import downloadFile from './downloadFile';

const FORM_ID = 'files-form';
const INPUT_PREFIX_ID = 'prefix';
const INPUT_POSTFIX_ID = 'postfix';

document.getElementById(FORM_ID).addEventListener('submit', event => {
  event.preventDefault();

  const zip = new JSZip();
  const formData = new FormData(document.getElementById(FORM_ID));
  const prefix = document.getElementById(INPUT_PREFIX_ID).value;
  const postfix = document.getElementById(INPUT_POSTFIX_ID).value;

  formData.forEach(value => {
    const name = value.name.replace(prefix, '').slice(0, -4);
    const year = name.slice(0, 4);
    const nameWithoutYear = name.slice(5);

    const formatedName = nameWithoutYear.split('-').map(item => {
      if (item.length === 1) {
        return `0${item}`;
      }

      return item;
    });

    const fileName = `${year}${formatedName.join('')}${postfix}.jpg`;

    zip.file(fileName, value);
  });

  zip.generateAsync({ type: 'blob' }).then(content => {
    downloadFile(content, 'screenshots.zip');
  });
});
