/*
 * Copyright (c) 2014, B3log Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.b3log.wordman.word;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.apache.commons.io.IOUtils;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * 词库获取与生成.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.1.0.1, May 12, 2014
 * @since 1.0.0
 */
public final class Main {

    /**
     * 超时.
     */
    private static final int TIMEOUT = 10000;

    /**
     * 分页数.
     */
    private static final int PAGE = 2;

    /**
     * 课程数.
     */
    private static final int CLASS_NUM = 105;

    /**
     * 课程词库名.
     */
    private static final String CLASS_NAME = "六级必备词汇";
    
    /**
     * 课程词库 id.
     */
    private static final String CLASS_ID = "12";

    /**
     * 私有的构造器.
     */
    private Main() {
    }

    /**
     * 入口.
     *
     * @param args 实参
     * @throws java.lang.Exception 如果异常
     */
    public static void main(final String[] args) throws Exception {
        final Clazz clazz = new Clazz();
        clazz.setId(CLASS_ID);
        clazz.setName(CLASS_NAME);
        final List<Word> classWords = new ArrayList<Word>();
        clazz.setWords(classWords);

        for (int clazzNum = 1; clazzNum <= CLASS_NUM; clazzNum++) {
            final Connection.Response response = Jsoup.connect("http://word.iciba.com/?action=words&class="
                                                               + clazz.getId() + "&course=" + clazzNum).
                    userAgent("Mozilla").timeout(TIMEOUT).execute();

            final Document document = response.parse();

            int classWordCnt = 0;
            for (int i = 1; i <= PAGE; i++) {
                final Elements wordList = document.select("ul#word_list_" + i);
                final Elements wordLi = wordList.select("li");

                for (final Element li : wordLi) {
                    final Word word = new Word();
                    word.setId(UUID.randomUUID().toString().replaceAll("-", ""));

                    final Element w = li.select("div.word_main_list_w").get(0);
                    word.setWord(w.select("span").get(0).text());

                    final Element y = li.select("div.word_main_list_y").get(0);
                    word.setPhon(y.select("strong").get(0).text());
                    word.setPron(y.select("a").get(0).id());

                    final Element s = li.select("div.word_main_list_s").get(0);
                    word.setPara(s.select("span").get(0).text());

                    // 暂时不管构词法和例句
                    word.setBuild("");
                    word.setExample("");

                    // System.out.println(word.toString());
                    classWords.add(word);
                    classWordCnt++;
                }
            }

            System.out.println("已完成课程 [" + clazzNum + "] 的获取，单词数 [" + classWordCnt + "]");
        }

        final StringBuilder sqlBuilder = new StringBuilder();

        final List<String> sqls = clazz.toSQLs();
        for (final String sql : sqls) {
            System.out.println(sql);
            sqlBuilder.append(sql).append(IOUtils.LINE_SEPARATOR);
        }

        final OutputStream outputStream = new FileOutputStream(new File("C:\\" + CLASS_NAME + ".sql"));
        IOUtils.write(sqlBuilder.toString(), outputStream, "UTF-8");
        IOUtils.closeQuietly(outputStream);
    }
}
