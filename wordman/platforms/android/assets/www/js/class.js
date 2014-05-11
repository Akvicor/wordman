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

// 数据库
var db = openDatabase('b3log-wordman', '1.0', 'Wordman 数据库', 2 * 1024 * 1024);
// 词库操作封装
var clazz = {
    /**
     * 初始化词库.
     * 
     * <p>
     * 将 /resources/classes/ 下的 *.zip 词库包导入到数据库中。
     * </p>
     */
    initClasses: function() {
        this.dropTables(db);

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
                                    clazz.importClass(db, '1');
                                    clazz.importClass(db, '2');
                                    clazz.importClass(db, '3');
                                    clazz.importClass(db, '4');
                                    clazz.importClass(db, '5');
                                    clazz.importClass(db, '6');
                                    clazz.importClass(db, '7');
                                    clazz.importClass(db, '8');
                                }
                            }, function(tx, err) {
                                console.error(err);
                            });
                        }
                    });
                });
            });
        });
    },
    importClass: function(db, clazz) {
        JSZipUtils.getBinaryContent('resources/classes/' + clazz + '.zip', function(err, data) {
            if (err) {
                console.error('加载词库异常', err);

                throw err;
            }

            var zip = new JSZip(data);

            var initClassSqls = zip.file('class.sql').asText().split('----');
            db.transaction(function(tx) {
                for (var i in initClassSqls) {
                    tx.executeSql(initClassSqls[i], [], function(tx, result) {
                    }, function(tx, err) {
                    });
                }

                console.info('初始化词库 [' + clazz + '] 完毕');
            });
        });
    },
    /**
     * 获取指定词库的单词数.
     * 
     * @param {type} db
     * @param {type} clazz 指定词库
     * @param {type} cb 回调
     * @returns {undefined}
     */
    countWord: function(db, clazz, cb) {
        db.transaction(function(tx) {
            tx.executeSql('select size from class where name = ?', [clazz], function(tx, result) {
                cb(result.rows.item(0).size);
            });
        });
    },
    /**
     * 获取所有词库列表.
     * 
     * @param {type} db
     * @param {type} cb 回调
     * @returns {undefined}
     */
    getClasses: function(db, cb) {
        var classes = [];

        db.transaction(function(tx) {
            tx.executeSql('select * from class', [], function(tx, result) {
                for (var i = 0; i < result.rows.length; i++) {
                    classes.push(result.rows.item(i));
                }

                cb(classes);
            });
        });
    },
    /**
     * 删除所有表，仅用于开发阶段.
     * 
     * @param {type} db
     * @returns {undefined}
     */
    dropTables: function(db) {
        db.transaction(function(tx) {
            tx.executeSql('drop table class');
            tx.executeSql('drop table classwords');
            tx.executeSql('drop table option');
            tx.executeSql('drop table word');
        });
        console.info('删除所有表完毕');
    }
};



