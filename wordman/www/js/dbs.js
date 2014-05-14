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

/**
 * @fileoverview 数据库工具.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.1.0.0, May 14, 2014
 * @since 1.0.0
 */

"use strict";

// 数据库工具
var dbs = {
    /**
     * 打开数据库.
     * 
     * @returns {Database}
     */
    openDatabase: function() {
        return openDatabase('b3log-wordman', '1.0', 'Wordman 数据库', 2 * 1024 * 1024);
    },
    /**
     * 初始化数据库.
     * 
     * @param {Function} cb 回调
     * @returns {undefined}
     */
    initDB: function(cb) {
        this.dropTables(function() {
            var db = dbs.openDatabase();

            db.transaction(function(tx) {
                tx.executeSql("select 1 from option", [], function(tx, result) {
                    console.debug('已经初始化过词库了');

                    clazz.countWords(function(count) {
                        console.info('所有词库单词计数 [' + count + ']');
                    });

                    return;
                }, function(tx, err) {
                    if (5 !== err.code) { // 非“表不存在”异常
                        console.error(err);

                        throw err;
                    }

                    // option 表不存在，说明是第一次使用，进行数据库初始化

                    $.get('resources/sql/install/1.0.0.sql', function(data) { // 获取建表语句
                        db.transaction(function(tx) {
                            console.info('第一次使用，初始化数据库');

                            var index = 0;
                            // 每一句建表 SQL 使用 ---- 分割
                            var createTableSqls = data.split('----');

                            for (var i in createTableSqls) {
                                tx.executeSql(createTableSqls[i], [], function(tx, result) {
                                    index++;
                                    if (index === (createTableSqls.length - 1)) { // 最后一个表建表完毕
                                        cb();
                                    }
                                }, function(tx, err) {
                                    console.error(err);
                                });
                            }
                        });
                    });
                });
            });
        });
    },
    /**
     * 生成 32 字符长度的唯一 id 字符串.
     * 
     * @returns {String}
     */
    genId: function() {
        return uuid().replace(new RegExp('-', 'gm'), '');
    },
    /**
     * 删除所有表，仅用于开发阶段.
     * 
     * @param {Function} cb 回调
     * @returns {undefined}
     */
    dropTables: function(cb) {
        var db = dbs.openDatabase();

        db.transaction(function(tx) {
            tx.executeSql('drop table if exists class');
            tx.executeSql('drop table if exists classwords');
            tx.executeSql('drop table if exists option');
            tx.executeSql('drop table if exists word');
            tx.executeSql('drop table if exists plan');
        });

        console.info('删除所有表完毕');

        cb();
    }
};

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
}





