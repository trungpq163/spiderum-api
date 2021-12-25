/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getPostDetailsThroughRawHTMLService,
  getPostDetailsService,
} from '../../services/post-details';
import { Request, Response } from 'express';
import { load } from 'cheerio';

export const getPostDetailsCtrl = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const resultFromRawHTML = await getPostDetailsThroughRawHTMLService({
      slug,
    });
    const resultFromAPI = await getPostDetailsService({ slug });

    if (resultFromRawHTML.status === 200 && resultFromAPI.status === 200) {
      const { post, postPageOptions } = resultFromAPI.data;
      const $ = load(resultFromRawHTML.data);
      $('.post').each((index: number, element: any) => {
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
            post: {
              ...post,
              body: contentList,
            },
            postPageOptions,
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
