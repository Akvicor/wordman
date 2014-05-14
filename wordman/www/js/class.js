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
 * @version 1.1.0.0, May 12, 2014
 * @since 1.0.0
 */

"use strict";

// 词库操作封装
var clazz = {
    /**
     * 第一次学习一个词库时默认的学习词数.
     * 
     * @type Number
     */
    DEFAULT_LEARN_NUM: 20,
    /**
     * 初始化词库.
     * 
     * <p>
     * 将 /resources/classes/ 下的 *.zip 词库包导入到数据库中。
     * </p>
     * 
     * @returns {undefined}
     */
    initClasses: function() {
        dbs.initDB(function() {
            console.info('建表完毕，开始导入默认词库');

            // 导入默认的词库
            clazz.importClass('1');
            clazz.importClass('2');
            // TODO: 加载默认词库
//            clazz.importClass('3');
//            clazz.importClass('4');
//            clazz.importClass('5');
//            clazz.importClass('6');
//            clazz.importClass('7');
//            clazz.importClass('8');

            // 生成 Wordman UUID
            genWordmanUUID();
        });
    },
    /**
     * 导入指定的词库.
     * 
     * @param {type} clazz 指定的词库
     * @returns {undefined}
     */
    importClass: function(clazz) {
        var db = dbs.openDatabase();

        var own = this;

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
                    }, function(tx, error) {
                        console.error('导入词库 [' + clazz + '] 异常 [' + tx + ']', error);
                    });
                }

                console.info('初始化词库 [' + clazz + '] 完毕');
            });
        });
    },
    /**
     * 获取指定词库的单词数.
     * 
     * @param {String} clazz 指定词库
     * @param {Function} cb 回调
     * @returns {undefined}
     */
    countWord: function(clazz, cb) {
        var db = dbs.openDatabase();

        db.transaction(function(tx) {
            tx.executeSql('select size from class where name = ?', [clazz], function(tx, result) {
                cb(result.rows.item(0).size);
            });
        });
    },
    /**
     * 所有词库一共单词计数.
     * 
     * @param {Function} cb 回调
     * @returns {undefined}
     */
    countWords: function(cb) {
        var db = dbs.openDatabase();

        db.transaction(function(tx) {
            tx.executeSql('select count(*) as c from word', [], function(tx, result) {
                cb(result.rows.item(0).c);
            }, function(tx, err) {
                console.error(err);
            });
        });
    },
    /**
     * 获取所有词库列表.
     * 
     * <p>
     * 回调实参：
     * <pre>
     * [{
     *     id: "12",
     *     name: "六级必备词汇",
     *     size: 2087,
     *     times: 1,
     *     selected: true,
     *     learned: 500, 
     *     finished: 300, 
     * }, ....]
     * </pre>
     * </p>
     * 
     * @param {Function} cb 回调
     * @returns {undefined}
     */
    getClasses: function(cb) {
        var classes = [];

        var db = dbs.openDatabase();

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
     * 指定词库“选定”状态.
     * 
     * <p>
     * 回调实参：
     * <pre>
     * {
     *     selected: true, 
     *     learnNum: 25, 
     * }
     * </pre>
     * </p>
     * 
     * @param {String} clazzId 指定词库 id
     * @param {Function} cb 回调
     * @returns {undefined}
     */
    selectState: function(clazzId, cb) {
        var db = dbs.openDatabase();

        db.transaction(function(tx) {
            tx.executeSql('select selected from class where id = ?', [clazzId], function(tx, result) {
                var ret = {};
                ret.selected = result.rows.item(0);

                db.transaction(function(tx) {
                    // TODO: 查询上一次用户设置的学习词数
                    tx.executeSql('select count(*) as c from plan where classId = ? and date = ?', [clazzId, today], function(tx, result) {
                        ret.learnNum = result.rows.item(0).c;

                        cb(ret);
                    });
                });
            });
        });
    },
    /**
     * 生成学习计划.
     * 
     * @param {String} clazzId 词库 id
     * @param {Number} learnNum 学习单词数
     * @param {Function} cb 回调
     * @returns {undefined}
     */
    genPlan: function(classId, learnNum, cb) {
        // TODO: remove today and gen

    },
    /**
     * “选定”指定的词库.
     * 
     * @param {type} classId 指定的词库 id
     * @returns {undefined}
     */
    selectClass: function(classId) {
        // class.selected = 1
    }

};

// 2.0.0 用于标识客户端
function genWordmanUUID() {
    var uuid = dbs.genId();
    var time = new Date().getTime();
    
    var value = {
      uuid: uuid,
      time: time
    };

    var db = dbs.openDatabase();
    db.transaction(function(tx) {
        tx.executeSql('insert into option values (?, ?, ?, ?)', [dbs.genId(), 'conf', 'client', JSON.stringify(value)], function(tx, result) {
            console.info('生成了沃德曼 UUID [' + uuid + ']');
        }, function(tx, err) {
            console.error('生成沃德曼 UUID 异常', err);
        });
    });
}



