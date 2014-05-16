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
 * @version 0.0.0.1, Apr 15, 2014
 */
var tip = {
    show: function(title, content, cb) {
        var windowH = $(window).height(),
                windowW = $(window).width();

        $(".tip-bg").height(windowH < document.documentElement.scrollHeight
                ? document.documentElement.scrollHeight : windowH);
        $(".tip-content").css({
            "top": parseInt((windowH - $(".tip-content").height()) / 2) + "px",
            "left": parseInt((windowW - $(".tip-content").width()) / 2) + "px"
        });

        $("#tipTitle").html(title);
        $("#tipContent").html(content);

        $(".tip-content, .tip-bg").show();
        this.cb = cb;
    },
    close: function() {
        this.cb();
        $(".tip-content, .tip-bg").hide();
    }
};