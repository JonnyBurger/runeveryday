import fs from 'fs';
import xns from 'xns';
import aws from 'aws-sdk';
import puppeteer from 'puppeteer';

xns(
	async (): Promise<string> => {
		const browser = await puppeteer.launch({
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
		const page = await browser.newPage();
		await page.goto('https://twitter.com/JNYBGR', {
			waitUntil: 'networkidle0',
			timeout: 60000
		});
		await page.screenshot({ path: 'image.jpg' });

		const Key = `${new Date().toISOString()}.jpg`;

		await new Promise((resolve, reject): void => {
			new aws.S3({
				region: 'us-east-1'
			}).putObject(
				{
					Body: fs.readFileSync('image.jpg'),
					Bucket: 'twitter-jonny',
					Key,
					ACL: 'public-read'
				},
				(err, d): void => {
					if (err) {
						return reject(err);
					} else {
						resolve(d);
					}
				}
			);
		});

		await browser.close();
		await fs.promises.unlink('image.jpg');

		return 'https://twitter-jonny.s3.amazonaws.com/' + Key;
	}
);
