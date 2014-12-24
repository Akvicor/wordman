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
 * @fileoverview common
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.2.2.1, July 15, 2014
 */
var tip = {
    show: function(title, content, cb) {
        if (title) {
            $("#tipTitle").html(title);
        }

        if (content) {
            $("#tipContent").html(content);
        }
        $(".tip-content").show();
        this.cb = cb;
    },
    close: function() {
        if (this.cb()) {
            $(".tip-content").hide();
        }
    }
};

var keyboard = {
    $it: {},
    placeholder: "",
    hide: function() {
        $(".keyboard").hide();
    },
    show: function(cb) {
        if (cb && typeof (cb) === "function") {
            keyboard.cb = cb;
        }
        $(".keyboard").show();
        
        if ($(".keyboard").height() + $(".recite-word").height() < $(window).height()) {
            $(".keyboard").css("position", "fixed");
        } else {
            $(".keyboard").css("position", "inherit");
        }
    },
    init: function() {
        this.$it = $(".keyboard");
        var $element = this.$it;

        this.placeholder = $("#wordInput").attr("placeholder");

        $element[0].addEventListener('touchstart', function(event) {
            if (event.target.nodeName.toLowerCase() !== "span") {
                return false;
            }
            $(event.target).addClass("touch");
        });

        $element[0].addEventListener("touchend", function(event) {
            if (event.target.nodeName.toLowerCase() !== "span") {
                return false;
            }

            var $it = $(event.target),
                    $input = $("#wordInput"),
                    key = $it.text();

            $it.removeClass("touch");

            if (event.target.className.indexOf("icon") > -1) {
                if ($it.hasClass("icon-arrow-up")) {
                    // 大小写切换
                    if ($element.hasClass("uppercase")) {
                        $element.removeClass("uppercase");
                    } else {
                        $element.addClass("uppercase");
                    }
                } else if ($it.hasClass("icon-erase")) {
                    // 删除
                    var text = $input.val();
                    if (keyboard.placeholder === text) {
                        return false;
                    }

                    if (keyboard.cb) {
                        keyboard.cb(text.substr(0, text.length - 1));
                    }
                } else if ($it.hasClass("icon-arrow")) {
                    if (keyboard.cb) {
                        keyboard.cb($input.val());
                    }
                    if ($(".btns .btn-red").length === 1) {
                        $(".btns .btn-red").click();
                    }
                    if ($(".btns .btn-green").length === 1) {
                        $(".btns .btn-green").click();
                    }
                    
                }
                return false;
            }

            var text = $input.val();
            if (keyboard.placeholder === text) {
                text = "";
            }

            if (keyboard.$it.hasClass("uppercase")) {
                key = key.toUpperCase();
            }

            if (keyboard.cb) {
                keyboard.cb(text + key);
            }
        });
    }
};