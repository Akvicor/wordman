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

import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

/**
 * 单词.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.0.0.0, May 10, 2014
 * @since 1.0.0
 */
public final class Word {

    /**
     * Id. 使用 UUID 生成.
     */
    private String id;

    /**
     * 单词.
     */
    private String word;

    /**
     * 音标.
     */
    private String phon;

    /**
     * 语音路径.
     */
    private String pron;

    /**
     * 释义.
     */
    private String para;

    /**
     * 构词法.
     */
    private String build;

    /**
     * 例句.
     */
    private String example;

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
     * Gets word.
     *
     * @return word
     */
    public String getWord() {
        return word;
    }

    /**
     * Sets word.
     *
     * @param word word
     */
    public void setWord(final String word) {
        this.word = word;
    }

    /**
     * Gets phon.
     *
     * @return phon
     */
    public String getPhon() {
        return phon;
    }

    /**
     * Sets phon.
     *
     * @param phon phon
     */
    public void setPhon(final String phon) {
        this.phon = phon;
    }

    /**
     * Gets pron.
     *
     * @return pron
     */
    public String getPron() {
        return pron;
    }

    /**
     * Sets pron.
     *
     * @param pron pron
     */
    public void setPron(final String pron) {
        this.pron = pron;
    }

    /**
     * Gets para.
     *
     * @return para
     */
    public String getPara() {
        return para;
    }

    /**
     * Sets para.
     *
     * @param para para
     */
    public void setPara(final String para) {
        this.para = para;
    }

    /**
     * Gets build.
     *
     * @return build
     */
    public String getBuild() {
        return build;
    }

    /**
     * Sets build.
     *
     * @param build build
     */
    public void setBuild(final String build) {
        this.build = build;
    }

    /**
     * Gets example.
     *
     * @return example
     */
    public String getExample() {
        return example;
    }

    /**
     * Sets example.
     *
     * @param example example
     */
    public void setExample(final String example) {
        this.example = example;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

}
