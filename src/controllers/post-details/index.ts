/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostDetails } from '../../services/post-details';
import { Request, Response } from 'express';
import { load } from 'cheerio';

export const getPostDetailsCtrl = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const result = await getPostDetails({ slug });
    if (result.status === 200) {
      const $ = load(result.data);
      $('.post').each((index: number, element: any) => {
        const category = $(element).find('div .category a').children().text();
        const title = $(element).find('.title').html();
        const description = $(element)
          .find('div .description')
          .children()
          .html()
          .replace(/\n/g, '');

        const authorInfo = {
          name: $(element).find('.author-info').find('.name').children().text(),
          avatarURL: $(element).find('.avatar').find('img').attr('src'),
          postCreatedDate: $(element)
            .find('.author-info')
            .find('.created-day')
            .text(),
        };
        const contentList: string[] = [];
        $(element)
          .find('.editor')
          .find('.ce-block__content')
          .each((index: number, element: any) => {
            const content = $(element)
              .html()
              .replace(/<!---->/g, '')
              .replace(/ _ngcontent-sc135=\"\"/g, '')
              .replace(
                / class=\"ce-paragraph cdx-block ce-paragraph--left\"/g,
                ''
              )
              // .replace(/ class=\"image-tool__image\"/g, '')
              // .replace(/ class=\"cdx-block cdx-pull-quote\"/g, '')
              // .replace(/ class=\"image-tool__image-picture\"/g, '')
              // .replace(/ class=\"cdx-input image-tool__caption\"/g, '')
              // .replace(/ class=\"image-tool__image-picture\"/g, '')
              .replace(/\s\s+/g, '');
            // .replace(/ class=\"link-tool\"/g, '')
            // .replace(
            //   / class=\"link-tool__content link-tool__content--rendered\"/g,
            //   ''
            // )
            // .replace(/ class=\"cdx-block link-block\"/g, '')
            // .replace(/ class=\"link-tool__image\"/g, '')
            // .replace(/ class=\"link-tool__title\"/g, '');
            contentList.push(content);
          });

        res.status(200).json({
          status: 200,
          data: {
            category,
            title,
            description,
            authorInfo,
            contentList,
          },
        });
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      ...error,
    });
  }
};
