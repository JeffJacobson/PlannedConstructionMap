import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
const alertSymbol = new CIMSymbol({
  data:
  {
      type: "CIMSymbolReference",
      symbol: {
          type: "CIMPointSymbol",
          symbolLayers: [
            {
              type: "CIMVectorMarker",
              enable: true,
              size: 24,
              offsetY: 12,//Half of symbol height
              frame: {
                xmin: 0,
                ymin: 0,
                xmax: 18,
                ymax: 24
              },
              markerGraphics: [
                {
                  textString:'',
                  primitiveName:'',
                  type: "CIMMarkerGraphic",
                  geometry: {
                    rings: [
                      [
                        [
                          15.37,
                          8.43
                        ],
                        [
                          16.49,
                          9.81
                        ],
                        [
                          17.32,
                          11.38
                        ],
                        [
                          17.83,
                          13.09
                        ],
                        [
                          18,
                          14.87
                        ],
                        [
                          17.83,
                          16.65
                        ],
                        [
                          17.32,
                          18.36
                        ],
                        [
                          16.49,
                          19.94
                        ],
                        [
                          15.36,
                          21.33
                        ],
                        [
                          14,
                          22.46
                        ],
                        [
                          12.44,
                          23.31
                        ],
                        [
                          10.76,
                          23.83
                        ],
                        [
                          9,
                          24
                        ],
                        [
                          7.24,
                          23.83
                        ],
                        [
                          5.56,
                          23.31
                        ],
                        [
                          4,
                          22.46
                        ],
                        [
                          2.64,
                          21.33
                        ],
                        [
                          1.51,
                          19.94
                        ],
                        [
                          0.68,
                          18.36
                        ],
                        [
                          0.17,
                          16.65
                        ],
                        [
                          0,
                          14.87
                        ],
                        [
                          0.17,
                          13.09
                        ],
                        [
                          0.68,
                          11.39
                        ],
                        [
                          1.5,
                          9.81
                        ],
                        [
                          2.62,
                          8.43
                        ],
                        [
                          8.18,
                          0.45
                        ],
                        [
                          8.54,
                          0.13
                        ],
                        [
                          9,
                          0.01
                        ],
                        [
                          9.46,
                          0.13
                        ],
                        [
                          9.82,
                          0.45
                        ],
                        [
                          15.37,
                          8.43
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          193,
                          7,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9,
                          7.25
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          193,
                          7,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.75,
                          15
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        enable: true,
                        capStyle: "Butt",
                        joinStyle: "Miter",
                        width: 0.5,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          8.98,
                          13.09
                        ],
                        [
                          9.36,
                          13.17
                        ],
                        [
                          9.69,
                          13.38
                        ],
                        [
                          9.9,
                          13.71
                        ],
                        [
                          9.98,
                          14.09
                        ],
                        [
                          9.98,
                          19.2
                        ],
                        [
                          9.9,
                          19.58
                        ],
                        [
                          9.69,
                          19.91
                        ],
                        [
                          9.36,
                          20.12
                        ],
                        [
                          8.98,
                          20.2
                        ],
                        [
                          8.93,
                          20.2
                        ],
                        [
                          8.55,
                          20.12
                        ],
                        [
                          8.22,
                          19.91
                        ],
                        [
                          8.01,
                          19.58
                        ],
                        [
                          7.93,
                          19.2
                        ],
                        [
                          7.93,
                          14.09
                        ],
                        [
                          8.01,
                          13.71
                        ],
                        [
                          8.22,
                          13.38
                        ],
                        [
                          8.55,
                          13.17
                        ],
                        [
                          8.93,
                          13.09
                        ],
                        [
                          8.98,
                          13.09
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9.59,
                          9.705
                        ],
                        [
                          9.983,
                          10.161
                        ],
                        [
                          10.044,
                          10.748
                        ],
                        [
                          9.752,
                          11.268
                        ],
                        [
                          9.206,
                          11.546
                        ],
                        [
                          8.59,
                          11.488
                        ],
                        [
                          8.111,
                          11.114
                        ],
                        [
                          7.931,
                          10.549
                        ],
                        [
                          8.244,
                          9.832
                        ],
                        [
                          8.998,
                          9.533
                        ],
                        [
                          9.59,
                          9.705
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                }
              ],
              scaleSymbolsProportionally: true,
              respectFrame: true,
            }
          ]
        }
  }
});
const alertSymbolMedium = new CIMSymbol({
    data:
    {
        type: "CIMSymbolReference",
        symbol: {
            type: "CIMPointSymbol",
            symbolLayers: [
              {
                type: "CIMVectorMarker",
                enable: true,
                size: 24,
                offsetY: 12,//Half of symbol height
                frame: {
                  xmin: 0,
                  ymin: 0,
                  xmax: 18,
                  ymax: 24
                },
                markerGraphics: [
                  {
                    type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    geometry: {
                      rings: [
                        [
                          [
                            15.37,
                            8.43
                          ],
                          [
                            16.49,
                            9.81
                          ],
                          [
                            17.32,
                            11.38
                          ],
                          [
                            17.83,
                            13.09
                          ],
                          [
                            18,
                            14.87
                          ],
                          [
                            17.83,
                            16.65
                          ],
                          [
                            17.32,
                            18.36
                          ],
                          [
                            16.49,
                            19.94
                          ],
                          [
                            15.36,
                            21.33
                          ],
                          [
                            14,
                            22.46
                          ],
                          [
                            12.44,
                            23.31
                          ],
                          [
                            10.76,
                            23.83
                          ],
                          [
                            9,
                            24
                          ],
                          [
                            7.24,
                            23.83
                          ],
                          [
                            5.56,
                            23.31
                          ],
                          [
                            4,
                            22.46
                          ],
                          [
                            2.64,
                            21.33
                          ],
                          [
                            1.51,
                            19.94
                          ],
                          [
                            0.68,
                            18.36
                          ],
                          [
                            0.17,
                            16.65
                          ],
                          [
                            0,
                            14.87
                          ],
                          [
                            0.17,
                            13.09
                          ],
                          [
                            0.68,
                            11.39
                          ],
                          [
                            1.5,
                            9.81
                          ],
                          [
                            2.62,
                            8.43
                          ],
                          [
                            8.18,
                            0.45
                          ],
                          [
                            8.54,
                            0.13
                          ],
                          [
                            9,
                            0.01
                          ],
                          [
                            9.46,
                            0.13
                          ],
                          [
                            9.82,
                            0.45
                          ],
                          [
                            15.37,
                            8.43
                          ]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: [
                            255,193,7,255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    geometry: {
                      rings: [
                        [
                          [
                            9,
                            7.25
                          ],
                          [
                            10.51,
                            7.4
                          ],
                          [
                            11.96,
                            7.84
                          ],
                          [
                            13.3,
                            8.55
                          ],
                          [
                            14.48,
                            9.52
                          ],
                          [
                            15.45,
                            10.7
                          ],
                          [
                            16.16,
                            12.04
                          ],
                          [
                            16.6,
                            13.49
                          ],
                          [
                            16.75,
                            15
                          ],
                          [
                            16.6,
                            16.51
                          ],
                          [
                            16.16,
                            17.96
                          ],
                          [
                            15.45,
                            19.3
                          ],
                          [
                            14.48,
                            20.48
                          ],
                          [
                            13.3,
                            21.45
                          ],
                          [
                            11.96,
                            22.16
                          ],
                          [
                            10.51,
                            22.6
                          ],
                          [
                            9,
                            22.75
                          ],
                          [
                            7.49,
                            22.6
                          ],
                          [
                            6.04,
                            22.16
                          ],
                          [
                            4.7,
                            21.45
                          ],
                          [
                            3.52,
                            20.48
                          ],
                          [
                            2.55,
                            19.3
                          ],
                          [
                            1.84,
                            17.96
                          ],
                          [
                            1.4,
                            16.51
                          ],
                          [
                            1.25,
                            15
                          ],
                          [
                            1.4,
                            13.49
                          ],
                          [
                            1.84,
                            12.04
                          ],
                          [
                            2.55,
                            10.7
                          ],
                          [
                            3.52,
                            9.52
                          ],
                          [
                            4.7,
                            8.55
                          ],
                          [
                            6.04,
                            7.84
                          ],
                          [
                            7.49,
                            7.4
                          ],
                          [
                            9,
                            7.25
                          ]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: [
                            255,
                            106,
                            19,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    geometry: {
                      rings: [
                        [
                          [
                            16.75,
                            15
                          ],
                          [
                            16.6,
                            13.49
                          ],
                          [
                            16.16,
                            12.04
                          ],
                          [
                            15.45,
                            10.7
                          ],
                          [
                            14.48,
                            9.52
                          ],
                          [
                            13.3,
                            8.55
                          ],
                          [
                            11.96,
                            7.84
                          ],
                          [
                            10.51,
                            7.4
                          ],
                          [
                            9,
                            7.25
                          ],
                          [
                            7.49,
                            7.4
                          ],
                          [
                            6.04,
                            7.84
                          ],
                          [
                            4.7,
                            8.55
                          ],
                          [
                            3.52,
                            9.52
                          ],
                          [
                            2.55,
                            10.7
                          ],
                          [
                            1.84,
                            12.04
                          ],
                          [
                            1.4,
                            13.49
                          ],
                          [
                            1.25,
                            15
                          ],
                          [
                            1.4,
                            16.51
                          ],
                          [
                            1.84,
                            17.96
                          ],
                          [
                            2.55,
                            19.3
                          ],
                          [
                            3.52,
                            20.48
                          ],
                          [
                            4.7,
                            21.45
                          ],
                          [
                            6.04,
                            22.16
                          ],
                          [
                            7.49,
                            22.6
                          ],
                          [
                            9,
                            22.75
                          ],
                          [
                            10.51,
                            22.6
                          ],
                          [
                            11.96,
                            22.16
                          ],
                          [
                            13.3,
                            21.45
                          ],
                          [
                            14.48,
                            20.48
                          ],
                          [
                            15.45,
                            19.3
                          ],
                          [
                            16.16,
                            17.96
                          ],
                          [
                            16.6,
                            16.51
                          ],
                          [
                            16.75,
                            15
                          ]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidStroke",
                          enable: true,
                          capStyle: "Butt",
                          joinStyle: "Miter",
                          width: 0.5,
                          color: [
                            255,
                            255,
                            255,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    geometry: {
                      rings: [
                        [
                          [
                            8.98,
                            13.09
                          ],
                          [
                            9.36,
                            13.17
                          ],
                          [
                            9.69,
                            13.38
                          ],
                          [
                            9.9,
                            13.71
                          ],
                          [
                            9.98,
                            14.09
                          ],
                          [
                            9.98,
                            19.2
                          ],
                          [
                            9.9,
                            19.58
                          ],
                          [
                            9.69,
                            19.91
                          ],
                          [
                            9.36,
                            20.12
                          ],
                          [
                            8.98,
                            20.2
                          ],
                          [
                            8.93,
                            20.2
                          ],
                          [
                            8.55,
                            20.12
                          ],
                          [
                            8.22,
                            19.91
                          ],
                          [
                            8.01,
                            19.58
                          ],
                          [
                            7.93,
                            19.2
                          ],
                          [
                            7.93,
                            14.09
                          ],
                          [
                            8.01,
                            13.71
                          ],
                          [
                            8.22,
                            13.38
                          ],
                          [
                            8.55,
                            13.17
                          ],
                          [
                            8.93,
                            13.09
                          ],
                          [
                            8.98,
                            13.09
                          ]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: [
                            255,
                            255,
                            255,
                            255
                          ]
                        }
                      ]
                    }
                  },
                  {
                    type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                    geometry: {
                      rings: [
                        [
                          [
                            9.59,
                            9.705
                          ],
                          [
                            9.983,
                            10.161
                          ],
                          [
                            10.044,
                            10.748
                          ],
                          [
                            9.752,
                            11.268
                          ],
                          [
                            9.206,
                            11.546
                          ],
                          [
                            8.59,
                            11.488
                          ],
                          [
                            8.111,
                            11.114
                          ],
                          [
                            7.931,
                            10.549
                          ],
                          [
                            8.244,
                            9.832
                          ],
                          [
                            8.998,
                            9.533
                          ],
                          [
                            9.59,
                            9.705
                          ]
                        ]
                      ]
                    },
                    symbol: {
                      type: "CIMPolygonSymbol",
                      symbolLayers: [
                        {
                          type: "CIMSolidFill",
                          enable: true,
                          color: [
                            255,
                            255,
                            255,
                            255
                          ]
                        }
                      ]
                    }
                  }
                ],
                scaleSymbolsProportionally: true,
                respectFrame: true,
              }
            ]
          }
    }
});const alertSymbolHigh = new CIMSymbol({
  data:
  {
      type: "CIMSymbolReference",
      symbol: {
          type: "CIMPointSymbol",
          symbolLayers: [
            {
              type: "CIMVectorMarker",
              enable: true,
              size: 24,
              offsetY: 12,//Half of symbol height
              frame: {
                xmin: 0,
                ymin: 0,
                xmax: 18,
                ymax: 24
              },
              markerGraphics: [
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          15.37,
                          8.43
                        ],
                        [
                          16.49,
                          9.81
                        ],
                        [
                          17.32,
                          11.38
                        ],
                        [
                          17.83,
                          13.09
                        ],
                        [
                          18,
                          14.87
                        ],
                        [
                          17.83,
                          16.65
                        ],
                        [
                          17.32,
                          18.36
                        ],
                        [
                          16.49,
                          19.94
                        ],
                        [
                          15.36,
                          21.33
                        ],
                        [
                          14,
                          22.46
                        ],
                        [
                          12.44,
                          23.31
                        ],
                        [
                          10.76,
                          23.83
                        ],
                        [
                          9,
                          24
                        ],
                        [
                          7.24,
                          23.83
                        ],
                        [
                          5.56,
                          23.31
                        ],
                        [
                          4,
                          22.46
                        ],
                        [
                          2.64,
                          21.33
                        ],
                        [
                          1.51,
                          19.94
                        ],
                        [
                          0.68,
                          18.36
                        ],
                        [
                          0.17,
                          16.65
                        ],
                        [
                          0,
                          14.87
                        ],
                        [
                          0.17,
                          13.09
                        ],
                        [
                          0.68,
                          11.39
                        ],
                        [
                          1.5,
                          9.81
                        ],
                        [
                          2.62,
                          8.43
                        ],
                        [
                          8.18,
                          0.45
                        ],
                        [
                          8.54,
                          0.13
                        ],
                        [
                          9,
                          0.01
                        ],
                        [
                          9.46,
                          0.13
                        ],
                        [
                          9.82,
                          0.45
                        ],
                        [
                          15.37,
                          8.43
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          193,
                          7,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9,
                          7.25
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          220,53,69,255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.75,
                          15
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        enable: true,
                        capStyle: "Butt",
                        joinStyle: "Miter",
                        width: 0.5,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          8.98,
                          13.09
                        ],
                        [
                          9.36,
                          13.17
                        ],
                        [
                          9.69,
                          13.38
                        ],
                        [
                          9.9,
                          13.71
                        ],
                        [
                          9.98,
                          14.09
                        ],
                        [
                          9.98,
                          19.2
                        ],
                        [
                          9.9,
                          19.58
                        ],
                        [
                          9.69,
                          19.91
                        ],
                        [
                          9.36,
                          20.12
                        ],
                        [
                          8.98,
                          20.2
                        ],
                        [
                          8.93,
                          20.2
                        ],
                        [
                          8.55,
                          20.12
                        ],
                        [
                          8.22,
                          19.91
                        ],
                        [
                          8.01,
                          19.58
                        ],
                        [
                          7.93,
                          19.2
                        ],
                        [
                          7.93,
                          14.09
                        ],
                        [
                          8.01,
                          13.71
                        ],
                        [
                          8.22,
                          13.38
                        ],
                        [
                          8.55,
                          13.17
                        ],
                        [
                          8.93,
                          13.09
                        ],
                        [
                          8.98,
                          13.09
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9.59,
                          9.705
                        ],
                        [
                          9.983,
                          10.161
                        ],
                        [
                          10.044,
                          10.748
                        ],
                        [
                          9.752,
                          11.268
                        ],
                        [
                          9.206,
                          11.546
                        ],
                        [
                          8.59,
                          11.488
                        ],
                        [
                          8.111,
                          11.114
                        ],
                        [
                          7.931,
                          10.549
                        ],
                        [
                          8.244,
                          9.832
                        ],
                        [
                          8.998,
                          9.533
                        ],
                        [
                          9.59,
                          9.705
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                }
              ],
              scaleSymbolsProportionally: true,
              respectFrame: true,
            }
          ]
        }
  }
});
const alertSymbolHighest = new CIMSymbol({
  data:
  {
      type: "CIMSymbolReference",
      symbol: {
          type: "CIMPointSymbol",
          symbolLayers: [
            {
              type: "CIMVectorMarker",
              enable: true,
              
              
              size: 24,
              offsetY: 12,//Half of symbol height
              
              frame: {
                xmin: 0,
                ymin: 0,
                xmax: 18,
                ymax: 24
              },
              markerGraphics: [
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          15.37,
                          8.43
                        ],
                        [
                          16.49,
                          9.81
                        ],
                        [
                          17.32,
                          11.38
                        ],
                        [
                          17.83,
                          13.09
                        ],
                        [
                          18,
                          14.87
                        ],
                        [
                          17.83,
                          16.65
                        ],
                        [
                          17.32,
                          18.36
                        ],
                        [
                          16.49,
                          19.94
                        ],
                        [
                          15.36,
                          21.33
                        ],
                        [
                          14,
                          22.46
                        ],
                        [
                          12.44,
                          23.31
                        ],
                        [
                          10.76,
                          23.83
                        ],
                        [
                          9,
                          24
                        ],
                        [
                          7.24,
                          23.83
                        ],
                        [
                          5.56,
                          23.31
                        ],
                        [
                          4,
                          22.46
                        ],
                        [
                          2.64,
                          21.33
                        ],
                        [
                          1.51,
                          19.94
                        ],
                        [
                          0.68,
                          18.36
                        ],
                        [
                          0.17,
                          16.65
                        ],
                        [
                          0,
                          14.87
                        ],
                        [
                          0.17,
                          13.09
                        ],
                        [
                          0.68,
                          11.39
                        ],
                        [
                          1.5,
                          9.81
                        ],
                        [
                          2.62,
                          8.43
                        ],
                        [
                          8.18,
                          0.45
                        ],
                        [
                          8.54,
                          0.13
                        ],
                        [
                          9,
                          0.01
                        ],
                        [
                          9.46,
                          0.13
                        ],
                        [
                          9.82,
                          0.45
                        ],
                        [
                          15.37,
                          8.43
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          193,
                          7,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9,
                          7.25
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          179,11,0,255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.75,
                          15
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        enable: true,
                        capStyle: "Butt",
                        joinStyle: "Miter",
                       
                        
                        width: 0.5,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          8.98,
                          13.09
                        ],
                        [
                          9.36,
                          13.17
                        ],
                        [
                          9.69,
                          13.38
                        ],
                        [
                          9.9,
                          13.71
                        ],
                        [
                          9.98,
                          14.09
                        ],
                        [
                          9.98,
                          19.2
                        ],
                        [
                          9.9,
                          19.58
                        ],
                        [
                          9.69,
                          19.91
                        ],
                        [
                          9.36,
                          20.12
                        ],
                        [
                          8.98,
                          20.2
                        ],
                        [
                          8.93,
                          20.2
                        ],
                        [
                          8.55,
                          20.12
                        ],
                        [
                          8.22,
                          19.91
                        ],
                        [
                          8.01,
                          19.58
                        ],
                        [
                          7.93,
                          19.2
                        ],
                        [
                          7.93,
                          14.09
                        ],
                        [
                          8.01,
                          13.71
                        ],
                        [
                          8.22,
                          13.38
                        ],
                        [
                          8.55,
                          13.17
                        ],
                        [
                          8.93,
                          13.09
                        ],
                        [
                          8.98,
                          13.09
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9.59,
                          9.705
                        ],
                        [
                          9.983,
                          10.161
                        ],
                        [
                          10.044,
                          10.748
                        ],
                        [
                          9.752,
                          11.268
                        ],
                        [
                          9.206,
                          11.546
                        ],
                        [
                          8.59,
                          11.488
                        ],
                        [
                          8.111,
                          11.114
                        ],
                        [
                          7.931,
                          10.549
                        ],
                        [
                          8.244,
                          9.832
                        ],
                        [
                          8.998,
                          9.533
                        ],
                        [
                          9.59,
                          9.705
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                }
              ],
              scaleSymbolsProportionally: true,
              respectFrame: true,
            }
          ]
        }
  }
});
const roadClosedSymbol = new CIMSymbol({
  data:
  {
      type: "CIMSymbolReference",
      symbol: {
          type: "CIMPointSymbol",
          symbolLayers: [
            {
              type: "CIMVectorMarker",
              enable: true,
              
              
              size: 24,
              offsetY: 12,//Half of symbol height
              
              frame: {
                xmin: 0,
                ymin: 0,
                xmax: 18,
                ymax: 24
              },
              markerGraphics: [
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          15.37,
                          8.43
                        ],
                        [
                          16.49,
                          9.81
                        ],
                        [
                          17.32,
                          11.38
                        ],
                        [
                          17.83,
                          13.09
                        ],
                        [
                          18,
                          14.87
                        ],
                        [
                          17.83,
                          16.65
                        ],
                        [
                          17.32,
                          18.36
                        ],
                        [
                          16.49,
                          19.94
                        ],
                        [
                          15.36,
                          21.33
                        ],
                        [
                          14,
                          22.46
                        ],
                        [
                          12.44,
                          23.31
                        ],
                        [
                          10.76,
                          23.83
                        ],
                        [
                          9,
                          24
                        ],
                        [
                          7.24,
                          23.83
                        ],
                        [
                          5.56,
                          23.31
                        ],
                        [
                          4,
                          22.46
                        ],
                        [
                          2.64,
                          21.33
                        ],
                        [
                          1.51,
                          19.94
                        ],
                        [
                          0.68,
                          18.36
                        ],
                        [
                          0.17,
                          16.65
                        ],
                        [
                          0,
                          14.87
                        ],
                        [
                          0.17,
                          13.09
                        ],
                        [
                          0.68,
                          11.39
                        ],
                        [
                          1.5,
                          9.81
                        ],
                        [
                          2.62,
                          8.43
                        ],
                        [
                          8.18,
                          0.45
                        ],
                        [
                          8.54,
                          0.13
                        ],
                        [
                          9,
                          0.01
                        ],
                        [
                          9.46,
                          0.13
                        ],
                        [
                          9.82,
                          0.45
                        ],
                        [
                          15.37,
                          8.43
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          193,
                          7,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9,
                          7.25
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          29,37,45,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          16.75,
                          15
                        ],
                        [
                          16.6,
                          13.49
                        ],
                        [
                          16.16,
                          12.04
                        ],
                        [
                          15.45,
                          10.7
                        ],
                        [
                          14.48,
                          9.52
                        ],
                        [
                          13.3,
                          8.55
                        ],
                        [
                          11.96,
                          7.84
                        ],
                        [
                          10.51,
                          7.4
                        ],
                        [
                          9,
                          7.25
                        ],
                        [
                          7.49,
                          7.4
                        ],
                        [
                          6.04,
                          7.84
                        ],
                        [
                          4.7,
                          8.55
                        ],
                        [
                          3.52,
                          9.52
                        ],
                        [
                          2.55,
                          10.7
                        ],
                        [
                          1.84,
                          12.04
                        ],
                        [
                          1.4,
                          13.49
                        ],
                        [
                          1.25,
                          15
                        ],
                        [
                          1.4,
                          16.51
                        ],
                        [
                          1.84,
                          17.96
                        ],
                        [
                          2.55,
                          19.3
                        ],
                        [
                          3.52,
                          20.48
                        ],
                        [
                          4.7,
                          21.45
                        ],
                        [
                          6.04,
                          22.16
                        ],
                        [
                          7.49,
                          22.6
                        ],
                        [
                          9,
                          22.75
                        ],
                        [
                          10.51,
                          22.6
                        ],
                        [
                          11.96,
                          22.16
                        ],
                        [
                          13.3,
                          21.45
                        ],
                        [
                          14.48,
                          20.48
                        ],
                        [
                          15.45,
                          19.3
                        ],
                        [
                          16.16,
                          17.96
                        ],
                        [
                          16.6,
                          16.51
                        ],
                        [
                          16.75,
                          15
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidStroke",
                        enable: true,
                        capStyle: "Butt",
                        joinStyle: "Miter",
                       
                        
                        width: 0.5,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          8.98,
                          13.09
                        ],
                        [
                          9.36,
                          13.17
                        ],
                        [
                          9.69,
                          13.38
                        ],
                        [
                          9.9,
                          13.71
                        ],
                        [
                          9.98,
                          14.09
                        ],
                        [
                          9.98,
                          19.2
                        ],
                        [
                          9.9,
                          19.58
                        ],
                        [
                          9.69,
                          19.91
                        ],
                        [
                          9.36,
                          20.12
                        ],
                        [
                          8.98,
                          20.2
                        ],
                        [
                          8.93,
                          20.2
                        ],
                        [
                          8.55,
                          20.12
                        ],
                        [
                          8.22,
                          19.91
                        ],
                        [
                          8.01,
                          19.58
                        ],
                        [
                          7.93,
                          19.2
                        ],
                        [
                          7.93,
                          14.09
                        ],
                        [
                          8.01,
                          13.71
                        ],
                        [
                          8.22,
                          13.38
                        ],
                        [
                          8.55,
                          13.17
                        ],
                        [
                          8.93,
                          13.09
                        ],
                        [
                          8.98,
                          13.09
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                },
                {
                  type: "CIMMarkerGraphic",
                  textString:'',
                  primitiveName:'',
                  geometry: {
                    rings: [
                      [
                        [
                          9.59,
                          9.705
                        ],
                        [
                          9.983,
                          10.161
                        ],
                        [
                          10.044,
                          10.748
                        ],
                        [
                          9.752,
                          11.268
                        ],
                        [
                          9.206,
                          11.546
                        ],
                        [
                          8.59,
                          11.488
                        ],
                        [
                          8.111,
                          11.114
                        ],
                        [
                          7.931,
                          10.549
                        ],
                        [
                          8.244,
                          9.832
                        ],
                        [
                          8.998,
                          9.533
                        ],
                        [
                          9.59,
                          9.705
                        ]
                      ]
                    ]
                  },
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          255,
                          255,
                          255,
                          255
                        ]
                      }
                    ]
                  }
                }
              ],
              scaleSymbolsProportionally: true,
              respectFrame: true
            }
          ]
        }
  }
});

export {alertSymbol, alertSymbolMedium,alertSymbolHigh, alertSymbolHighest, roadClosedSymbol}