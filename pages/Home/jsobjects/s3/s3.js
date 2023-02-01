export default {
saveToS3: async (file) => {
	const bucket = 'ricive-mobile-app-storage';
	const accessKeyId = 'AKIAT5IKIAOFM3NTTKVF';
	const secretAccessKey = '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';
	const region = 'us-east-1';
  const endpoint = `https://${bucket}.s3.${region}.amazonaws.com`;
  const key = file.name;
  const contentType = file.type;
  const date = new Date().toUTCString();
  const requestMethod = 'PUT';
  const requestPath = `/${key}`;
  const requestBody = file;

  const stringToSign = `${requestMethod}\n\n${contentType}\n${date}\n${requestPath}`;
  const hmac = forge.hmac.create();
  hmac.start('sha1', secretAccessKey);
  hmac.update(stringToSign);
  const signature = forge.util.encode64(hmac.digest().bytes());

  const response = await fetch(`${endpoint}/${key}`, {
    method: requestMethod,
    headers: {
      'Content-Type': contentType,
      'Authorization': `AWS ${accessKeyId}:${signature}`,
      'x-amz-date': date
    },
    body: requestBody
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return `${endpoint}/${key}`;
},
uploadToS3:async (file) => {
  const AWS_ACCESS_KEY = "AKIAT5IKIAOFM3NTTKVF"
  const AWS_SECRET_KEY = "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"
  const BUCKET_NAME = "ricive-mobile-app-storage"

  const request = new XMLHttpRequest();
  const url = "https://" + BUCKET_NAME + ".s3.amazonaws.com/";
  const contentType = file.type;
  const date = new Date().toUTCString();
  const fileName = file.name;
  const base64Data = file.data.split(',')[1];

  const signature = "PUT\n\n" + contentType + "\n" + date + "\n" + "x-amz-acl:public-read\n" + "/" + BUCKET_NAME + "/" + fileName;
  const md = forge.md.sha1.create();
  md.update(signature);
  const signatureHash = forge.util.encode64(md.digest().getBytes());

  request.open("PUT", url + fileName, true);
  request.setRequestHeader("Content-Type", contentType);
  request.setRequestHeader("x-amz-date", date);
  request.setRequestHeader("Authorization", "AWS " + AWS_ACCESS_KEY + ":" + signatureHash);
  request.setRequestHeader("x-amz-acl", "public-read");

  request.send(base64Data);

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      console.log("File uploaded successfully, URL:", url + fileName);
    }
  };
  return url + fileName;
}

}