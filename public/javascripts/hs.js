

window.onload = function () {

    // window.location.href = "/asset";
    /** HOSUNG MIGRATION */

    var national_pension_down_content = document.getElementById(
        "national_pension_down_content"
    );
    var national_pension_down_button = document.getElementById(
        "national_pension_down_button"
    );
    national_pension_down_button.addEventListener(
        "click",
        national_pension_content
    );


    function national_pension_content() {

        if (national_pension_down_content.style.display == "none") {
            national_pension_down_content.style.display = "block";
            national_pension_down_button.childNodes[1].className = national_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-down",
                "fa-chevron-up"
            );
        } else {
            national_pension_down_content.style.display = "none";
            national_pension_down_button.childNodes[1].className = national_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-up",
                "fa-chevron-down"
            );
        }
    }

    //퇴직연금 button으로 위아래
    var retire_pension_down_content = document.getElementById(
        "retire_pension_down_content"
    );
    var retire_pension_down_button = document.getElementById(
        "retire_pension_down_button"
    );

    retire_pension_down_button.addEventListener(
        "click",
        retire_pension_down_button1
    );

    function retire_pension_down_button1() {
        if (retire_pension_down_content.style.display == "none") {
            retire_pension_down_content.style.display = "block";

            retire_pension_down_button.childNodes[1].className = retire_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-down",
                "fa-chevron-up"
            );
            retire_pension_down_content.style.display = "block";
        } else {
            retire_pension_down_content.style.display = "none";
            retire_pension_down_button.childNodes[1].className = retire_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-up",
                "fa-chevron-down"
            );
        }
    }

    //개인연금 button으로 위아래
    var personal_pension_down_button = document.getElementById(
        "personal_pension_down_button"
    );
    var personal_pension_down_content = document.getElementById(
        "personal_pension_down_content"
    );

    personal_pension_down_button.addEventListener(
        "click",
        personal_pension_down_button1
    );

    function personal_pension_down_button1() {
        if (personal_pension_down_content.style.display == "none") {
            personal_pension_down_content.style.display = "block";
            personal_pension_down_button.childNodes[1].className = personal_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-down",
                "fa-chevron-up"
            );
        } else {
            personal_pension_down_content.style.display = "none";
            personal_pension_down_button.childNodes[1].className = personal_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-up",
                "fa-chevron-down"
            );
        }
    }

    //금융자산 button으로 위아래
    var financial_pension_down_button = document.getElementById(
        "financial_pension_down_button"
    );
    var financial_pension_down_content = document.getElementById(
        "financial_pension_down_content"
    );

    financial_pension_down_button.addEventListener(
        "click",
        financial_pension_down_button1
    );

    function financial_pension_down_button1() {
        if (financial_pension_down_content.style.display == "none") {
            financial_pension_down_content.style.display = "block";
            financial_pension_down_button.childNodes[1].className = financial_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-down",
                "fa-chevron-up"
            );
        } else {
            financial_pension_down_content.style.display = "none";
            financial_pension_down_button.childNodes[1].className = financial_pension_down_button.childNodes[1].className.replace(
                "fa-chevron-up",
                "fa-chevron-down"
            );
        }
    }

    const pension_array = [
        {
            type: "국민연금",
            list: [{ name: "국민연금", amount: "48477420", used: true }],
        },
        {
            type: "퇴직연금",
            list: [
                {
                    name: "AB미국그로스(주식-재간접)",
                    amount: "44415792",
                    used: true,
                },

            ],
            sums: function () {
                var sum = 0;
                for (var i = 0; i < this.list.length; ++i) {
                    if (this.list[i].used == true) {
                        sum += Number(this.list[i].amount);
                    }
                }
                return sum;
            },
        },
        {
            type: "개인연금",
            list: [
                { name: "KB실버웰빙 연금신탁(채권형)", amount: "28497190", used: true },
                // { name: "CHN중국펀드", amount: "523272", used: true },
            ],
        },
        {
            type: "금융자산",
            list: [
                {
                    name: "마이다스 미소 중소형주 투자신탁",
                    amount: "200000000",
                    used: true,
                },
            ],
        },
        {
            type: "기타자산",
            list: [
                { name: "금", amount: "888888", used: true },
                { name: "은", amount: "343333", used: true },
            ],
        },
    ];

    //pension_array값을 납부총액, 평가금액 등 detail에 넣기
    var pension_array_0_0 = document.getElementById("pension_array_0_0");
    pension_array_0_0.innerHTML =
        "납부총액 : " + numberWithCommas(pension_array[0].list[0].amount) + "원";

    var pension_array_1_0 = document.getElementById("pension_array_1_0");
    pension_array_1_0.innerHTML =
        "평가금액 : " + numberWithCommas(pension_array[1].list[0].amount) + "원";

    //khs
    // var pension_array_1_1 = document.getElementById("pension_array_1_1");
    // pension_array_1_1.innerHTML =
    //   "평가금액 : " + numberWithCommas(pension_array[1].list[1].amount) + "원";

    var pension_array_2_0 = document.getElementById("pension_array_2_0");
    pension_array_2_0.innerHTML =
        "평가금액 : " + numberWithCommas(pension_array[2].list[0].amount) + "원";

    var pension_array_3_0 = document.getElementById("pension_array_3_0");
    pension_array_3_0.innerHTML =
        "평가금액 : " + numberWithCommas(pension_array[3].list[0].amount) + "원";

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var toggle_array = document.getElementsByClassName(
        "national_pension_down_toggle_whole"
    );

    calculator();
    function calculator() {
        // console.log(pension_array[1].list.length);

        //국민연금 총액 national_pension_total_sum
        var national_pension_total_sum = 0;
        if (pension_array[0].list[0].used == true) {
            national_pension_total_sum = pension_array[0].list[0].amount;
        }
        var national_pension_calculate2 = document.getElementById(
            "national_pension_calculate2"
        );
        national_pension_calculate2.innerHTML =
            numberWithCommas(national_pension_total_sum) + "원";

        //퇴직연금 총액 retire_pension_total_sum
        var retire_pension_total_sum = 0;
        for (var i = 0; i < pension_array[1].list.length; ++i) {
            if (pension_array[1].list[i].used == true) {
                retire_pension_total_sum += Number(pension_array[1].list[i].amount);
            }
        }
        var national_pension_calculate1 = document.getElementById(
            "national_pension_calculate1"
        );
        national_pension_calculate1.innerHTML =
            numberWithCommas(retire_pension_total_sum) + "원";

        //연금성 총액 다 더한값 pension_total_sum
        var pension_total_sum = 0;
        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < pension_array[i].list.length; ++j) {
                if (pension_array[i].list[j].used == true) {
                    pension_total_sum += Number(pension_array[i].list[j].amount);
                }
            }
        }
        // khs 이 계산 함수 전체
        // console.log("연금총액 총 값 :", pension_total_sum);
        // var national_pension_calculate3 = document.getElementById(
        //     "national_pension_calculate3"
        // );
        // national_pension_calculate3.innerHTML = "원";
        // national_pension_calculate3.innerHTML =
        //     numberWithCommas(Math.floor(pension_total_sum)) +
        //     national_pension_calculate3.innerHTML;

        //개인연금 personal_total_sum
        var personal_total_sum = 0;
        for (var i = 0; i < pension_array[2].list.length; ++i) {
            if (pension_array[2].list[i].used == true) {
                personal_total_sum += Number(pension_array[2].list[i].amount);
            }
        }
        //   console.log("개인연금 총 값 :", personal_total_sum);
        var personal_pension_calculate = document.getElementById(
            "personal_pension_calculate"
        );
        personal_pension_calculate.innerHTML =
            numberWithCommas(personal_total_sum) + "원";

        //금융자산(위)  financial_total_sum
        var financial_total_sum = 0;
        for (var i = 0; i < pension_array[3].list.length; ++i) {
            if (pension_array[3].list[i].used == true) {
                financial_total_sum += Number(pension_array[3].list[i].amount);
            }
        }
        // console.log("금융자산 총 값 :", financial_total_sum);
        // var national_pension_calculate4 = document.getElementById(
        //     "national_pension_calculate4"
        // );
        var hs_asset_list_financial_pension_money_1 = document.getElementById(
            "hs_asset_list_financial_pension_money_1"
        );

        // national_pension_calculate4.innerHTML = "원";
        // national_pension_calculate4.innerHTML =
        //     numberWithCommas(financial_total_sum) +
        //     national_pension_calculate4.innerHTML;

        hs_asset_list_financial_pension_money_1.innerHTML = "원";
        hs_asset_list_financial_pension_money_1.innerHTML =
            numberWithCommas(financial_total_sum) +
            hs_asset_list_financial_pension_money_1.innerHTML;

        //은퇴준비 자산총액 = 연금성 자산+ 금융자산   total_sum
        var total_sum = Math.floor(
            Number(pension_total_sum) + Number(financial_total_sum)
        );
        var hs_label_inside_first_money = document.getElementById(
            "hs_label_inside_first_money"
        );
        hs_label_inside_first_money.innerHTML = "원";
        hs_label_inside_first_money.innerHTML =
            numberWithCommas(total_sum) + hs_label_inside_first_money.innerHTML;
    }

    function ho(event) {
        //     console.log(event.currentTarget.id);

        //national_pension_down_toggle_whole_id_1
        switch (event.currentTarget.id) {
            case "national_pension_down_toggle_whole_id_1":
                //id로,
                var a = document.getElementById(
                    "national_pension_down_toggle_circle_id_1"
                );
                var b = document.getElementById(
                    "national_pension_down_toggle_whole_id_1"
                );

                var left = a.style.left;
                if (left == "" || left == "40px") {
                    b.style.background = "#CCCCCC";
                    a.style.left = "0px";
                    //      console.log("1번 토글 off");
                    pension_array[0].list[0].used = false;

                    calculator();
                } else if (left == "0px") {
                    b.style.background = "#53FF4C";
                    a.style.left = "40px";
                    //    console.log("1번 토글 on"

                    pension_array[0].list[0].used = true;
                    calculator();
                }
                break;
            //national_pension_down_toggle_whole_id_2
            case "national_pension_down_toggle_whole_id_2":
                var a = document.getElementById(
                    "national_pension_down_toggle_circle_id_2"
                );
                var b = document.getElementById(
                    "national_pension_down_toggle_whole_id_2"
                );

                var left = a.style.left;
                if (left == "" || left == "40px") {
                    b.style.background = "#CCCCCC";
                    a.style.left = "0px";
                    //     console.log("2번 토글 off");
                    pension_array[1].list[0].used = false;
                    calculator();
                } else if (left == "0px") {
                    b.style.background = "#53FF4C";
                    a.style.left = "40px";
                    //   console.log("2번 토글 on");
                    pension_array[1].list[0].used = true;
                    calculator();
                }
                break;

            case "national_pension_down_toggle_whole_id_4":
                //id로,
                var a = document.getElementById(
                    "national_pension_down_toggle_circle_id_4"
                );
                var b = document.getElementById(
                    "national_pension_down_toggle_whole_id_4"
                );

                var left = a.style.left;
                if (left == "" || left == "40px") {
                    b.style.background = "#CCCCCC";
                    a.style.left = "0px";
                    //    console.log("4번 토글 off");
                    pension_array[2].list[0].used = false;
                    calculator();
                } else if (left == "0px") {
                    b.style.background = "#53FF4C";
                    a.style.left = "40px";
                    //    console.log("4번 토글 on");
                    pension_array[2].list[0].used = true;
                    calculator();
                }
                break;
            //national_pension_down_toggle_whole_id_5
            case "national_pension_down_toggle_whole_id_5":
                //id로,
                var a = document.getElementById(
                    "national_pension_down_toggle_circle_id_5"
                );
                var b = document.getElementById(
                    "national_pension_down_toggle_whole_id_5"
                );

                var left = a.style.left;
                if (left == "" || left == "40px") {
                    b.style.background = "#CCCCCC";
                    a.style.left = "0px";
                    //   console.log("5번 토글 off");
                    pension_array[3].list[0].used = false;
                    calculator();
                } else if (left == "0px") {
                    b.style.background = "#53FF4C";
                    a.style.left = "40px";
                    //   console.log("5번 토글 on");
                    pension_array[3].list[0].used = true;
                    calculator();
                }
                break;
        }
    }

    toggle_array[0].addEventListener("click", ho);
    toggle_array[1].addEventListener("click", ho);
    toggle_array[2].addEventListener("click", ho);
    toggle_array[3].addEventListener("click", ho);


    //modal 초기, 안보이게
    var modal_pension_container = document.getElementsByClassName(
        "modal_pension_container"
    );
    modal_pension_container.item(0).style.display = "none";
    modal_pension_container.item(1).style.display = "none";
    modal_pension_container.item(2).style.display = "none";
    modal_pension_container.item(3).style.display = "none";

    //range버튼 클릭 ->modal open
    var pension_range_button = document.getElementsByClassName(
        "pension_range_button"
    );
    pension_range_button[0].addEventListener("click", function () {
        modal_click(0);
    });
    pension_range_button[1].addEventListener("click", function () {
        modal_click(1);
    });
    pension_range_button[2].addEventListener("click", function () {
        modal_click(2);
    });
    pension_range_button[3].addEventListener("click", function () {
        modal_click(3);
    });

    //modal open
    function modal_click(arg) {
        modal_pension_container.item(arg).style.display = "block";
    }

    // modal 나이 버튼 클릭
    var modal_pension_boxlist = document.getElementsByClassName(
        "modal_pension_boxlist"
    );

    //modal button-text값 연동
    //국민연금 modal
    modal_pension_boxlist[0].addEventListener("click", function () {
        get_selected_age(0);
    });
    //퇴직연금 modal
    modal_pension_boxlist[1].addEventListener("click", function () {
        get_selected_age(1);
    });
    modal_pension_boxlist[2].addEventListener("click", function () {
        get_selected_age(2);
    });
    //개인연금 modal
    modal_pension_boxlist[3].addEventListener("click", function () {
        get_selected_age(3);
    });
    modal_pension_boxlist[4].addEventListener("click", function () {
        get_selected_age(4);
    });
    //금융자산 modal
    modal_pension_boxlist[5].addEventListener("click", function () {
        get_selected_age(5);
    });
    modal_pension_boxlist[6].addEventListener("touch", function () {
        get_selected_age(6);
    });

    function get_selected_age(arg) {
        switch (arg) {
            //국민연금 modal
            case 0: {
                //수급시작년
                var slider_range_0_0 = document.getElementById("slider_range_0_0");
                slider_range_0_0.innerHTML =
                    modal_pension_boxlist[0].options.selectedIndex + 60;
                var slider_range_0_0_1 = document.getElementById("slider_range_0_0_1");
                slider_range_0_0_1.innerHTML =
                    modal_pension_boxlist[0].options.selectedIndex + 60 - 17;
                var pension_0_0_range_start_text = document.getElementById(
                    "pension_0_0_range_start_text"
                );
                pension_0_0_range_start_text.innerHTML =
                    modal_pension_boxlist[0].options.selectedIndex + 60 - 17;

                var pension_0_0_range_start_text2 = document.getElementById(
                    "pension_0_0_range_start_text2"
                );
                pension_0_0_range_start_text2.innerHTML =
                    modal_pension_boxlist[0].options.selectedIndex + 60;
                break;
            }
            //퇴직연금 modal
            case 1: {
                //0번째라서 밀린거구나. 1번째부터해야하고. 
                //수급시작년
                var slider_range_1_0 = document.getElementById("slider_range_1_0");
                slider_range_1_0.innerHTML =
                    modal_pension_boxlist[1].options.selectedIndex + 55;
                var slider_range_1_0_1 = document.getElementById("slider_range_1_0_1");
                slider_range_1_0_1.innerHTML =
                    modal_pension_boxlist[1].options.selectedIndex + 55 - 22;
                var pension_1_0_range_start_text = document.getElementById(
                    "pension_1_0_range_start_text"
                );
                pension_1_0_range_start_text.innerHTML =
                    modal_pension_boxlist[1].options.selectedIndex + 55 - 22;

                var pension_1_0_range_start_text2 = document.getElementById(
                    "pension_1_0_range_start_text2"
                );
                pension_1_0_range_start_text2.innerHTML =
                    modal_pension_boxlist[1].options.selectedIndex + 55;
                break;
            }
            //수급종료년
            case 2: {
                var slider_range_1_1 = document.getElementById("slider_range_1_1");
                var slider_range_1_1_1 = document.getElementById("slider_range_1_1_1");
                if (modal_pension_boxlist[2].options.selectedIndex == 0) {
                    slider_range_1_1.innerHTML = 74;
                    slider_range_1_1_1.innerHTML = 52;
                }
                else {
                    slider_range_1_1.innerHTML =
                        modal_pension_boxlist[2].options.selectedIndex + 55 - 1;
                    slider_range_1_1_1.innerHTML =
                        modal_pension_boxlist[2].options.selectedIndex + 55 - 22 - 1;
                }
                break;
            }
            //개인연금 modal
            case 3: {
                //수급시작년
                var slider_range_2_0 = document.getElementById("slider_range_2_0");
                slider_range_2_0.innerHTML =
                    modal_pension_boxlist[3].options.selectedIndex + 58;
                var slider_range_2_0_1 = document.getElementById("slider_range_2_0_1");
                slider_range_2_0_1.innerHTML =
                    modal_pension_boxlist[3].options.selectedIndex + 58 - 22;
                var pension_2_0_range_start_text = document.getElementById(
                    "pension_2_0_range_start_text"
                );
                pension_2_0_range_start_text.innerHTML =
                    modal_pension_boxlist[3].options.selectedIndex + 58 - 22;

                var pension_2_0_range_start_text2 = document.getElementById(
                    "pension_2_0_range_start_text2"
                );
                pension_2_0_range_start_text2.innerHTML =
                    modal_pension_boxlist[3].options.selectedIndex + 58;
                break;
            }
            //수급종료년
            case 4: {
                var slider_range_2_1 = document.getElementById("slider_range_2_1");
                var slider_range_2_1_1 = document.getElementById("slider_range_2_1_1");

                if (modal_pension_boxlist[4].options.selectedIndex == 0) {
                    slider_range_2_1.innerHTML = 62;
                    slider_range_2_1_1.innerHTML = 40;
                }
                else {
                    slider_range_2_1.innerHTML =
                        modal_pension_boxlist[4].options.selectedIndex + 58 - 4;

                    slider_range_2_1_1.innerHTML =
                        modal_pension_boxlist[4].options.selectedIndex + 58 - 22 - 4;
                }
                break;
            }
            //금융자산 modal
            case 5: {
                //수급시작년
                var slider_range_3_0 = document.getElementById("slider_range_3_0");
                slider_range_3_0.innerHTML =
                    modal_pension_boxlist[5].options.selectedIndex + 55;
                var slider_range_3_0_1 = document.getElementById("slider_range_3_0_1");
                slider_range_3_0_1.innerHTML =
                    modal_pension_boxlist[5].options.selectedIndex + 55 - 22;
                var pension_3_0_range_start_text = document.getElementById(
                    "pension_3_0_range_start_text"
                );
                pension_3_0_range_start_text.innerHTML =
                    modal_pension_boxlist[5].options.selectedIndex + 55 - 22;

                var pension_3_0_range_start_text2 = document.getElementById(
                    "pension_3_0_range_start_text2"
                );
                pension_3_0_range_start_text2.innerHTML =
                    modal_pension_boxlist[5].options.selectedIndex + 55;
                break;
            }
            //수급종료년
            case 6: {
                var slider_range_3_1 = document.getElementById("slider_range_3_1");
                var slider_range_3_1_1 = document.getElementById("slider_range_3_1_1");

                if (modal_pension_boxlist[6].options.selectedIndex == 0) {
                    slider_range_3_1.innerHTML = 90;
                    slider_range_3_1_1.innerHTML = 68;
                }
                else {
                    slider_range_3_1.innerHTML =
                        modal_pension_boxlist[6].options.selectedIndex + 55 - 1;

                    slider_range_3_1_1.innerHTML =
                        modal_pension_boxlist[6].options.selectedIndex + 55 - 22 - 1;
                }
                break;
            }
        }
    }

    //modal 닫기버튼
    var modal_pension_array_0_0_close = document.getElementsByClassName(
        "modal_pension_array_0_0_close"
    );
    modal_pension_array_0_0_close[0].addEventListener("click", function () {
        range_close(0);
    });
    modal_pension_array_0_0_close[2].addEventListener("click", function () {
        range_close(2);
    });
    modal_pension_array_0_0_close[4].addEventListener("click", function () {
        range_close(4);
    });
    modal_pension_array_0_0_close[6].addEventListener("click", function () {
        range_close(6);
    });

    //modal close
    function range_close(arg) {
        modal_pension_container.item(arg / 2).style.display = "none";
    }

}

// }