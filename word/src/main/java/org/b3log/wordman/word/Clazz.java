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

import java.util.ArrayList;
import java.util.List;

/**
 * 课程词库.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.0.1.1, May 14, 2014
 * @since 1.0.0
 */
public final class Clazz {

    /**
     * Id.
     */
    private String id;

    /**
     * 词库名.
     */
    private String name;

    /**
     * 单词表.
     */
    private List<Word> words;

    /**
     * Gets id.
     *
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id id
     */
    public void setId(final String id) {
        this.id = id;
    }

    /**
     * Gets name.
     *
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name.
     *
     * @param name name
     */
    public void setName(final String name) {
        this.name = name;
    }

    /**
     * Gets words.
     *
     * @return words
     */
    public List<Word> getWords() {
        return words;
    }

    /**
     * Sets words.
     *
     * @param words words
     */
    public void setWords(final List<Word> words) {
        this.words = words;
    }

    /**
     * 获取 SQL 语句.
     *
     * @return SQL
     */
    public List<String> toSQLs() {
        final List<String> ret = new ArrayList<String>();

        ret.add("CREATE TABLE IF NOT EXISTS `" + "word_" + id + "` ("
                + "  `id` char(32) NOT NULL,"
                + "  `word` varchar(55) NOT NULL,"
                + "  `classId` char(32) NOT NULL,"
                + "  `phon` varchar(255) NOT NULL,"
                + "  `pron` varchar(255) NOT NULL,"
                + "  `para` varchar(512) NOT NULL,"
                + "  `build` varchar(512) NOT NULL,"
                + "  `example` varchar(1024) NOT NULL"
                + ");----");

        for (final Word word : words) {
            final String w = word.getWord().replaceAll("'", "''");
            final String phon = word.getPhon().replaceAll("'", "''");
            final String para = word.getPara().replaceAll("'", "''");
            final String build = (null == word.getBuild()) ? null : word.getBuild().replaceAll("'", "''");
            final String example = (null == word.getExample()) ? null : word.getExample().replaceAll("'", "''");

            ret.add("INSERT INTO " + "word_" + id + " VALUES ('" + word.getId() + "','" + w + "','" + id + "','" + phon + "','"
                    + word.getPron() + "','" + para + "','" + build + "','" + example + "');----");
        }

        ret.add("INSERT INTO class VALUES ('" + id + "','" + name + "'," + words.size() + ",0,0,0,0);");

        return ret;
    }

}
