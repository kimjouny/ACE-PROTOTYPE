/* 금액의 단위는 천 원 */
const CUSTOMERS=[
    {
        name : '엄성율',
        pensions : [
            {
                type : '국민연금',
                category: "국민연금",
                product_name : '노령연금(개시전, 현재가치 0%',
                receipt_date :'2043-05',
                receipts:[
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 9671, 14666,
                    14827, 14990, 15155, 15322, 15490, 15661,
                    15833, 16007, 16183, 16361, 16541, 16723,
                    16907, 17093, 17281, 17471, 17663, 17858,
                    18054, 18253, 18454, 18656, 18862, 19069
                    ],
                sum:429051
            },
            {
                type : '국민은행',
                category: "퇴직연금",
                product_name : 'AB미국그로스(주식-재간접)CE-P2 외',
                receipt_date : '2038',
                receipts : [
                    2932, 2992, 3054, 3117, 3181, 3246,
                    3313, 3381, 3450, 3521, 3593, 3667,
                    3742, 3818, 3896, 3975, 4055, 4136,
                    4217, 4278, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0
                ],
                sum : 71564
            },
            {
                type : '국민은행',
                category: "개인연금",
                product_name : '연금신탁',
                receipt_date : '2037-02',
                receipts : [
                    0, 0, 0, 10630, 10849, 11066,
                    11287, 11513, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                ],
                sum : 55351
            },
            {
                type : '본인',
                category: "금융자산",
                product_name : '자산',
                receipt_date : '2033',
                receipts : [
                    3321, 3321, 3321, 3321, 3321, 3321,
                    3321, 3321, 3321, 3321, 3321, 3321,
                    3321, 3321, 3321, 3321, 3321, 3321,
                    3321, 3321, 3321, 3321, 3321, 3321,
                    3321, 3321, 3321, 3321, 3321, 3321,
                    3321, 3321, 3321, 3321, 3321, 3321                  
                ],
                sum : 119572
            }
        ] 
    }
];

const PERSONA=[
    {
        name:'엄성율',
        assets:[
            {
                asset_type:"국민연금",
                product_lists:[
                    {
                        product_name: "노령연금(개시전, 현재가치 0%)",
                        product_agent: "국민연금",
                        receipt_date: "2043-05",
                        receipts:[
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 9671, 14666,
                            14827, 14990, 15155, 15322, 15490, 15661,
                            15833, 16007, 16183, 16361, 16541, 16723,
                            16907, 17093, 17281, 17471, 17663, 17858,
                            18054, 18253, 18454, 18656, 18862, 19069
                        ]
                    }
                ]
            },
            {
                asset_type:"퇴직연금",
                product_lists:[
                    {
                        product_name:"AB미국그로스(주식-재간접)CE-P2 외",
                        product_agent:"국민은행",
                        receipt_date:"2033",
                        receipts:[
                            2932, 2992, 3054, 3117, 3181, 3246,
                            3313, 3381, 3450, 3521, 3593, 3667,
                            3742, 3818, 3896, 3975, 4055, 4136,
                            4217, 4278, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0
                        ]
                    },
                    {
                        product_name:"퇴직연금DB",
                        product_agent:"국민은행",
                        receipt_date:"2033",
                        receipts:[
                            10894, 10894, 10894, 10894, 10894, 10894,
                            10894, 10894, 10894, 10894, 10894, 10894,
                            10894, 10894, 10894, 10894, 10894, 10894,
                            10894, 10894, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0
                        ]
                    }
                ]
            },
            {
                asset_type:"개인연금",
                product_lists:[
                    {
                        product_name:"연금신탁",
                        product_agent:"국민은행",
                        receipt_date:"2037-02",
                        receipts:[
                            0, 0, 0, 10720, 10935, 11153,
                            11376, 11604, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0
                        ]
                    }
                ]
            },
            {
                asset_type:"금융자산",
                product_lists:[
                    {
                        product_name:"펀드",
                        product_agent:"국민은행",
                        receipt_date:"",
                        receipts:[
                            6643, 6643, 6643, 6643, 6643, 6643,
                            6643, 6643, 6643, 6643, 6643, 6643,
                            6643, 6643, 6643, 6643, 6643, 6643,
                            6643, 6643, 6643, 6643, 6643, 6643,
                            6643, 6643, 6643, 6643, 6643, 6643,
                            6643, 6643, 6643, 6643, 6643, 6643
                        ]
                    }
                ]
            },
        ]
    }
]

const OPTIMIZED_PERSONA=[
    {
        name:'엄성율',
        assets:[
            {
                asset_type:"국민연금",
                product_lists:[
                    {
                        product_name: "노령연금(개시전, 현재가치 0%)",
                        product_agent: "국민연금",
                        receipt_date: "2043-05",
                        receipts:[
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 9671, 14666,
                            14827, 14990, 15155, 15322, 15490, 15661,
                            15833, 16007, 16183, 16361, 16541, 16723,
                            16907, 17093, 17281, 17471, 17663, 17858,
                            18054, 18253, 18454, 18656, 18862, 19069
                        ]
                    }
                ]
            },
            {
                asset_type:"퇴직연금",
                product_lists:[
                    {
                        product_name:"AB미국그로스(주식-재간접)CE-P2 외",
                        product_agent:"국민은행",
                        receipt_date:"2033",
                        receipts:[
                            2932, 2992, 3054, 3117, 3181, 3246,
                            3313, 3381, 3450, 3521, 3593, 3667,
                            3742, 3818, 3896, 3975, 4055, 4136,
                            4217, 4278, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0
                        ]
                    },
                    {
                        product_name:"퇴직연금DB",
                        product_agent:"국민은행",
                        receipt_date:"2033",
                        receipts:[
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 10894, 10894,
                            10894, 10894, 10894, 10894, 10894, 10894,
                            10894, 10894, 10894, 10894, 10894, 10894,
                            10894, 10894, 10894, 10894, 10894, 10894,
                            0, 0, 0, 0, 0, 0,
                        ]
                    }
                ]
            },
            {
                asset_type:"개인연금",
                product_lists:[
                    {
                        product_name:"연금신탁",
                        product_agent:"국민은행",
                        receipt_date:"2037-02",
                        receipts:[
                            0, 0, 0, 10720, 10935, 11153,
                            11376, 11604, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0
                        ]
                    }
                ]
            },
            {
                asset_type:"금융자산",
                product_lists:[
                    {
                        product_name:"펀드",
                        product_agent:"국민은행",
                        receipt_date:"",
                        receipts:[
                            13286, 13286, 13286, 13286, 13286, 13286,
                            13286, 13286, 13286, 13286, 0, 0,
                            0, 0, 0, 0, 0, 0,
                            0, 0, 6643, 6643, 6643, 6643,
                            6643, 6643, 6643, 6643, 6643, 6643,
                            6643, 6643, 6643, 6643, 6643, 6643
                        ]
                    }
                ]
            },
        ]
    }
]

export {PERSONA};
export {CUSTOMERS,OPTIMIZED_PERSONA};