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
 * 词库操作.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.0.0.0, May 10, 2014
 * @since 1.0.0
 */

"use strict";

/**
 * 初始化词库.
 * 
 * <p>
 * 将 /resources/classes/ 下的 *.zip 词库包导入到数据库中。
 * </p>
 */
function initClasses() {
    var db = openDatabase('b3log-wordman', '1.0', 'Wordman 数据库', 2 * 1024 * 1024);

    dropTables(db);

    db.transaction(function(tx) {
        tx.executeSql("select 1 from option", [], function(tx, result) {
            console.debug('已经初始化过词库了');

//            tx.executeSql('select count(*) as c from word', [], function(tx, result) {
//                console.log(result.rows.item(0).c);
//            }, function(tx, err) {
//                console.error(err);
//            });

            return;
        }, function(tx, err) {
            console.error(err);
            if (5 !== err.code) { // 非“表不存在”异常
                console.error(err);

                throw err;
            }

            // option 表不存在，说明是第一次使用，进行数据库初始化

            $.get('resources/sql/install/1.0.0.sql', function(data) { // 获取建表语句
                db.transaction(function(tx) {
                    console.info('第一次使用，初始化数据库');
                    var index = 0;
                    var createTableSqls = data.split('----');
                    for (var i in createTableSqls) {
                        tx.executeSql(createTableSqls[i], [], function(tx, result) {
                            index++;
                            if (index === (createTableSqls.length - 1)) { // 最后一个表建表完毕
                                console.info('建表完毕，开始导入默认词库');

                                // 导入默认的词库
                                importClass(db, 'GRE必备词汇');
                                importClass(db, 'TOEFL必备词汇');
                                importClass(db, '大学六级必备词汇');
                                importClass(db, '大学四级必备词汇');
                                importClass(db, '高考常用短语');
                                importClass(db, '高考大纲词汇');
                                importClass(db, '考研必备词汇');
                                importClass(db, '雅思必备词汇');
                            }
                        }, function(tx, err) {
                            console.error(err);
                        });
                    }
                });
            });
        });
    });
}

function importClass(db, clazz) {
    JSZipUtils.getBinaryContent('resources/classes/' + clazz + '.zip', function(err, data) {
        if (err) {
            console.error('加载词库异常', err);

            throw err;
        }

        var zip = new JSZip(data);

        var initClassSqls = zip.file('class.sql').asText().split('----');
        var count = 0;
        db.transaction(function(tx) {
            for (var i in initClassSqls) {
                tx.executeSql(initClassSqls[i], [], function(tx, result) {
                }, function(tx, err) {
                });
            }

            console.info('初始化词库 [' + clazz + '] 完毕');
        });
    });
}

/**
 * 删除所有表，仅用于开发阶段.
 * 
 * @param {type} db
 * @returns {undefined}
 */
function dropTables(db) {
    db.transaction(function(tx) {
        tx.executeSql('drop table class');
        tx.executeSql('drop table classwords');
        tx.executeSql('drop table option');
        tx.executeSql('drop table word');
    });

    console.info('删除所有表完毕');
}




