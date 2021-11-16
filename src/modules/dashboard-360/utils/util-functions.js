import map from 'lodash/map';

export function getAddressFromObj(obj) {
  return `${obj.address1}, ${obj.address2}, ${obj.BillingTownArea}, ${obj.BillingCityName}, ${obj.BillingStateName}, ${obj.BillingCountryName}, ${obj.BillingPin}`;
}

export function getDependentQuestionsCodes(options, dependentQuesCodes) {
  for (let opt of options) {
    if (opt.dependentQuestion) {
      //dependentQuesCodes = [...dependentQuesCodes, ...map(opt.dependentQuestion,'questionCode')]
      dependentQuesCodes.push(...map(opt.dependentQuestion, 'questionCode'));
      for (let depQue of opt.dependentQuestion) {
        getDependentQuestionsCodes(depQue.option, dependentQuesCodes);
      }
    }
  }
  return dependentQuesCodes;
}

export function getDispositionFormQuestions2() {
  const questionArr = [
    {
      questionCode: 'mainDisposition',
      question: 'Main Disposition',
      questionName: 'QA_1',
      option: [
        {
          label: 'Connected',
          dependentQuestion: [
            {
              questionCode: 'response',
              question: 'Response',
              questionName: 'QA_3',
              option: [
                {
                  label: 'Interested',
                  dependentQuestion: [
                    {
                      questionCode: 'languageChoosed',
                      question: 'Language',
                      questionName: 'QA_5',
                      option: [
                        {
                          label: 'English'
                        },
                        {
                          label: 'Tamil'
                        },
                        {
                          label: 'Kannada'
                        },
                        {
                          label: 'Hindi'
                        },
                        {
                          label: 'Malayalam'
                        },
                        {
                          label: 'Telugu'
                        }
                      ]
                    },
                    {
                      questionCode: 'customerExperiences',
                      question: "Customer Experience's",
                      questionName: 'QA_6',
                      option: [
                        {
                          label: 'Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_7',
                              questionType: 'radio',
                              option: [
                                {
                                  label: '1'
                                },
                                {
                                  label: '2'
                                },
                                {
                                  label: '3'
                                },
                                {
                                  label: '4'
                                },
                                {
                                  label: '5'
                                }
                              ]
                            },
                            {
                              questionCode: 'taste',
                              question: 'Food Taste',
                              questionName: 'QA_8',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Different taste from other DT'
                                }
                              ]
                            },
                            {
                              questionCode: 'foodFreshness',
                              question: 'Food Freshness',
                              questionName: 'QA_9',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'spicy',
                              question: 'Spicy',
                              questionName: 'QA_10',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'serverService',
                              question:
                                'Was the server attentive, friendly & knowledgeable?',
                              questionName: 'QA_11',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeAttended',
                              question: 'Wait time to be attended to',
                              questionName: 'QA_12',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeForOrder',
                              question:
                                'Wait time for order to be served to the customer',
                              questionName: 'QA_13',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'cleanliness',
                              question: 'Cleanliness',
                              questionName: 'QA_14',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'seating',
                              question: 'Seating',
                              questionName: 'QA_15',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'quantity',
                              question: 'Quantity',
                              questionName: 'QA_16',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'More'
                                },
                                {
                                  label: 'Less'
                                },
                                {
                                  label: 'Adequate'
                                }
                              ]
                            },
                            {
                              questionCode: 'price',
                              question: 'Price',
                              questionName: 'QA_17',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'High'
                                },
                                {
                                  label: 'Average'
                                },
                                {
                                  label: 'Low'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_18',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            }
                          ]
                        },
                        {
                          label: 'Not Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'issues',
                              question: 'Issues',
                              questionName: 'QA_19',
                              option: [
                                {
                                  label: 'Wrong item / delivery'
                                },
                                {
                                  label: 'Not happy with the Ambience'
                                },
                                {
                                  label: 'Not happy with service'
                                },
                                {
                                  label: 'No much variety'
                                },
                                {
                                  label: 'Issue with quality_uncooked food'
                                },
                                {
                                  label: 'Issue with quality_Stable food'
                                },
                                {
                                  label: 'Issue with quality_Spice food'
                                },
                                {
                                  label: 'Issue with quality_Over cooked food'
                                },
                                {
                                  label: 'Issue with quality_Oily'
                                },
                                {
                                  label: 'Issue with quality_Cold food'
                                },
                                {
                                  label: 'Issue with quality_Bland'
                                },
                                {
                                  label: 'Happy with the Service/Food/Overall'
                                },
                                {
                                  label: 'Delay in service'
                                }
                              ]
                            },
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_20',
                              questionType: 'radio',
                              option: [
                                {
                                  label: '1'
                                },
                                {
                                  label: '2'
                                },
                                {
                                  label: '3'
                                },
                                {
                                  label: '4'
                                },
                                {
                                  label: '5'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_21',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            }
                          ]
                        },
                        {
                          label: 'Average',
                          dependentQuestion: [
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_22',
                              questionType: 'radio',
                              option: [
                                {
                                  label: '1'
                                },
                                {
                                  label: '2'
                                },
                                {
                                  label: '3'
                                },
                                {
                                  label: '4'
                                },
                                {
                                  label: '5'
                                }
                              ]
                            },
                            {
                              questionCode: 'taste',
                              question: 'Food Taste',
                              questionName: 'QA_23',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Different taste from other DT'
                                }
                              ]
                            },
                            {
                              questionCode: 'foodFreshness',
                              question: 'Food Freshness',
                              questionName: 'QA_24',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'spicy',
                              question: 'Spicy',
                              questionName: 'QA_25',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'serverService',
                              question:
                                'Was the server attentive, friendly & knowledgeable?',
                              questionName: 'QA_26',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeAttended',
                              question: 'Wait time to be attended to',
                              questionName: 'QA_27',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeForOrder',
                              question:
                                'Wait time for order to be served to the customer',
                              questionName: 'QA_28',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'cleanliness',
                              question: 'Cleanliness',
                              questionName: 'QA_29',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'seating',
                              question: 'Seating',
                              questionName: 'QA_30',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'quantity',
                              question: 'Quantity',
                              questionName: 'QA_31',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'More'
                                },
                                {
                                  label: 'Less'
                                },
                                {
                                  label: 'Adequate'
                                }
                              ]
                            },
                            {
                              questionCode: 'price',
                              question: 'Price',
                              questionName: 'QA_32',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'High'
                                },
                                {
                                  label: 'Average'
                                },
                                {
                                  label: 'Low'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_33',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'Not interested',
                  dependentQuestion: [
                    {
                      questionCode: 'remarks_feedback5',
                      question: 'Remarks/feedback',
                      questionName: 'QA_4',
                      questionType: 'textarea',
                      additionalConfig: {
                        rows: 4
                      },
                      option: [{}]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Not Connected',
          dependentQuestion: [
            {
              questionCode: 'subDisposition',
              question: 'Sub disposition',
              questionName: 'QA_2',
              option: [
                {
                  label: 'RNR'
                },
                {
                  label: 'Not Reachable'
                },
                {
                  label: 'Switch Off'
                },
                {
                  label: 'Wrong Number'
                },
                {
                  label: 'Call Disconnected'
                },
                {
                  label: 'Language Barrier'
                },
                {
                  label: 'Not Interested to share feedback'
                },
                {
                  label: 'Invalid number'
                },
                {
                  label: 'Busy'
                },
                {
                  label: 'Feedback taken'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return questionArr;
}

export function getDispositionFormQuestions3() {
  const questionArr = [
    {
      questionCode: 'mainDisposition',
      question: 'Main Disposition',
      questionName: 'QA_1',
      option: [
        {
          label: 'Connected',
          dependentQuestion: [
            {
              questionCode: 'response',
              question: 'Response',
              questionName: 'QA_3',
              option: [
                {
                  label: 'Interested',
                  dependentQuestion: [
                    {
                      questionCode: 'languageChoosed',
                      question: 'Language',
                      questionName: 'QA_5',
                      option: [
                        {
                          label: 'English'
                        },
                        {
                          label: 'Tamil'
                        },
                        {
                          label: 'Kannada'
                        },
                        {
                          label: 'Hindi'
                        },
                        {
                          label: 'Malayalam'
                        },
                        {
                          label: 'Telugu'
                        }
                      ]
                    },
                    {
                      questionCode: 'customerExperiences',
                      question: "Customer Experience's",
                      questionName: 'QA_6',
                      option: [
                        {
                          label: 'Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_7',
                              questionType: 'radio',
                              option: [
                                {
                                  label: '1'
                                },
                                {
                                  label: '2'
                                },
                                {
                                  label: '3'
                                },
                                {
                                  label: '4'
                                },
                                {
                                  label: '5'
                                }
                              ]
                            },
                            {
                              questionCode: 'taste',
                              question: 'Food Taste',
                              questionName: 'QA_8',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Different taste from other DT'
                                }
                              ]
                            },
                            {
                              questionCode: 'foodFreshness',
                              question: 'Food Freshness',
                              questionName: 'QA_9',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'spicy',
                              question: 'Spicy',
                              questionName: 'QA_10',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'serverService',
                              question:
                                'Was the server attentive, friendly & knowledgeable?',
                              questionName: 'QA_11',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeAttended',
                              question: 'Wait time to be attended to',
                              questionName: 'QA_12',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeForOrder',
                              question:
                                'Wait time for order to be served to the customer',
                              questionName: 'QA_13',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'cleanliness',
                              question: 'Cleanliness',
                              questionName: 'QA_14',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'seating',
                              question: 'Seating',
                              questionName: 'QA_15',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'quantity',
                              question: 'Quantity',
                              questionName: 'QA_16',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'More'
                                },
                                {
                                  label: 'Less'
                                },
                                {
                                  label: 'Adequate'
                                }
                              ]
                            },
                            {
                              questionCode: 'price',
                              question: 'Price',
                              questionName: 'QA_17',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'High'
                                },
                                {
                                  label: 'Average'
                                },
                                {
                                  label: 'Low'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_18',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            },
                            {
                              questionCode: 'escalated',
                              question: 'Escalated to L2',
                              questionType: 'checkbox',
                              questionName: 'QA_38',
                              option: [
                                {
                                  label: 'Yes',
                                  name: 'escalated'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          label: 'Not Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'issues',
                              question: 'Issues',
                              questionName: 'QA_19',
                              option: [
                                {
                                  label: 'Wrong item / delivery'
                                },
                                {
                                  label: 'Not happy with the Ambience'
                                },
                                {
                                  label: 'Not happy with service'
                                },
                                {
                                  label: 'No much variety'
                                },
                                {
                                  label: 'Issue with quality_uncooked food'
                                },
                                {
                                  label: 'Issue with quality_Stable food'
                                },
                                {
                                  label: 'Issue with quality_Spice food'
                                },
                                {
                                  label: 'Issue with quality_Over cooked food'
                                },
                                {
                                  label: 'Issue with quality_Oily'
                                },
                                {
                                  label: 'Issue with quality_Cold food'
                                },
                                {
                                  label: 'Issue with quality_Bland'
                                },
                                {
                                  label: 'Happy with the Service/Food/Overall'
                                },
                                {
                                  label: 'Delay in service'
                                }
                              ]
                            },
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_20',
                              questionType: 'radio',
                              option: [
                                {
                                  label: '1'
                                },
                                {
                                  label: '2'
                                },
                                {
                                  label: '3'
                                },
                                {
                                  label: '4'
                                },
                                {
                                  label: '5'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_21',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            },
                            {
                              questionCode: 'escalated',
                              question: 'Escalated to L2',
                              questionType: 'checkbox',
                              questionName: 'QA_37',
                              option: [
                                {
                                  label: 'Yes',
                                  name: 'escalated'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          label: 'Average',
                          dependentQuestion: [
                            {
                              questionCode: 'overallCustomerRating',
                              question: 'Overall customer rating given in call',
                              questionName: 'QA_22',
                              questionType: 'radio',
                              option: [
                                {
                                  label: '1'
                                },
                                {
                                  label: '2'
                                },
                                {
                                  label: '3'
                                },
                                {
                                  label: '4'
                                },
                                {
                                  label: '5'
                                }
                              ]
                            },
                            {
                              questionCode: 'taste',
                              question: 'Food Taste',
                              questionName: 'QA_23',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Different taste from other DT'
                                }
                              ]
                            },
                            {
                              questionCode: 'foodFreshness',
                              question: 'Food Freshness',
                              questionName: 'QA_24',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'spicy',
                              question: 'Spicy',
                              questionName: 'QA_25',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'serverService',
                              question:
                                'Was the server attentive, friendly & knowledgeable?',
                              questionName: 'QA_26',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Yes'
                                },
                                {
                                  label: 'No'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeAttended',
                              question: 'Wait time to be attended to',
                              questionName: 'QA_27',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'waitTimeForOrder',
                              question:
                                'Wait time for order to be served to the customer',
                              questionName: 'QA_28',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'On Time'
                                },
                                {
                                  label: '<5 mts'
                                },
                                {
                                  label: '5-10 mts'
                                },
                                {
                                  label: '10-20 mts'
                                },
                                {
                                  label: '20-30 mts'
                                },
                                {
                                  label: '>30 mts'
                                }
                              ]
                            },
                            {
                              questionCode: 'cleanliness',
                              question: 'Cleanliness',
                              questionName: 'QA_29',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'seating',
                              question: 'Seating',
                              questionName: 'QA_30',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'Good'
                                },
                                {
                                  label: 'Bad'
                                },
                                {
                                  label: 'Need Improvement'
                                }
                              ]
                            },
                            {
                              questionCode: 'quantity',
                              question: 'Quantity',
                              questionName: 'QA_31',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'More'
                                },
                                {
                                  label: 'Less'
                                },
                                {
                                  label: 'Adequate'
                                }
                              ]
                            },
                            {
                              questionCode: 'price',
                              question: 'Price',
                              questionName: 'QA_32',
                              questionType: 'radio',
                              option: [
                                {
                                  label: 'High'
                                },
                                {
                                  label: 'Average'
                                },
                                {
                                  label: 'Low'
                                }
                              ]
                            },
                            {
                              questionCode: 'remarks_feedback',
                              question: 'Remarks/feedback',
                              questionName: 'QA_33',
                              questionType: 'textarea',
                              additionalConfig: {
                                rows: 4
                              },
                              option: [{}]
                            },
                            {
                              questionCode: 'escalated',
                              question: 'Escalated to L2',
                              questionType: 'checkbox',
                              questionName: 'QA_36',
                              option: [
                                {
                                  label: 'Yes',
                                  name: 'escalated'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'Not interested',
                  dependentQuestion: [
                    {
                      questionCode: 'remarks_feedback5',
                      question: 'Remarks/feedback',
                      questionName: 'QA_4',
                      questionType: 'textarea',
                      additionalConfig: {
                        rows: 4
                      },
                      option: [{}]
                    },
                    {
                      questionCode: 'escalated',
                      question: 'Escalated to L2',
                      questionType: 'checkbox',
                      questionName: 'QA_34',
                      option: [
                        {
                          label: 'Yes',
                          name: 'escalated'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Not Connected',
          dependentQuestion: [
            {
              questionCode: 'subDisposition',
              question: 'Sub disposition',
              questionName: 'QA_2',
              option: [
                {
                  label: 'RNR'
                },
                {
                  label: 'Not Reachable'
                },
                {
                  label: 'Switch Off'
                },
                {
                  label: 'Wrong Number'
                },
                {
                  label: 'Call Disconnected'
                },
                {
                  label: 'Language Barrier'
                },
                {
                  label: 'Not Interested to share feedback'
                },
                {
                  label: 'Invalid number'
                },
                {
                  label: 'Busy'
                },
                {
                  label: 'Feedback taken'
                }
              ]
            },
            {
              questionCode: 'escalated',
              question: 'Escalated to L2',
              questionType: 'checkbox',
              questionName: 'QA_35',
              option: [
                {
                  label: 'Yes',
                  name: 'escalated'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return questionArr;
}

export function getDispositionFormQuestions4() {
  const questionArr = [
    {
      questionCode: 'mainDisposition',
      question: 'Main Disposition',
      questionName: 'QA_101',
      option: [
        {
          label: 'Connected',
          dependentQuestion: [
            {
              questionCode: 'response',
              question: 'Response',
              questionName: 'QA_103',
              option: [
                {
                  label: 'Interested',
                  dependentQuestion: [
                    {
                      questionCode: 'languageChoosed',
                      question: 'Language',
                      questionName: 'QA_105',
                      option: [
                        {
                          label: 'English'
                        },
                        {
                          label: 'Tamil'
                        },
                        {
                          label: 'Kannada'
                        },
                        {
                          label: 'Hindi'
                        },
                        {
                          label: 'Malayalam'
                        },
                        {
                          label: 'Telugu'
                        }
                      ]
                    },
                    {
                      questionCode: 'foodQuality',
                      question: 'Food Quality',
                      questionName: 'QA_106',
                      questionType: 'radio',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'foodQuantity',
                      question: 'Food Quantity',
                      questionType: 'radio',
                      questionName: 'QA_107',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'foodPackaging',
                      question: 'Food Packaging',
                      questionName: 'QA_108',
                      questionType: 'radio',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'wrongItem',
                      question: 'Wrong Item',
                      questionType: 'radio',
                      questionName: 'QA_109',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'missingItem',
                      question: 'Missing Item',
                      questionType: 'radio',
                      questionName: 'QA_110',
                      option: [
                        {
                          label: 'Highly Satisfied'
                        },
                        {
                          label: 'Satisfied'
                        },
                        {
                          label: 'Neutral'
                        },
                        {
                          label: 'Dissatisfied'
                        },
                        {
                          label: 'Highly Dissatisfied'
                        }
                      ]
                    },
                    {
                      questionCode: 'overallCustomerRating',
                      question: 'Overall customer rating given in call',
                      questionName: 'QA_111',
                      questionType: 'radio',
                      option: [
                        {
                          label: '1'
                        },
                        {
                          label: '2'
                        },
                        {
                          label: '3'
                        },
                        {
                          label: '4'
                        },
                        {
                          label: '5'
                        }
                      ]
                    },
                    {
                      questionCode: 'customerExperiences',
                      question: "Customer Experience's",
                      questionName: 'QA_112',
                      option: [
                        {
                          label: 'Happy',
                          dependentQuestion: [
                            {
                              questionCode: 'recommendUs',
                              question:
                                'How would you recommend us to your friends and family',
                              questionName: 'QA_113',
                              questionType: 'radio',
                              option: [
                                {
                                  label: '1'
                                },
                                {
                                  label: '2'
                                },
                                {
                                  label: '3'
                                },
                                {
                                  label: '4'
                                },
                                {
                                  label: '5'
                                },
                                {
                                  label: '6'
                                },
                                {
                                  label: '7'
                                },
                                {
                                  label: '8'
                                },
                                {
                                  label: '9'
                                },
                                {
                                  label: '10'
                                }
                              ]
                            }
                          ]
                        },
                        {
                          label: 'Average'
                        },
                        {
                          label: 'Not Happy'
                        }
                      ]
                    },
                    {
                      questionCode: 'escalated',
                      question: 'Escalated to L2',
                      questionType: 'checkbox',
                      questionName: 'QA_140',
                      option: [
                        {
                          label: 'Yes',
                          name: 'escalated'
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'Not interested',
                  dependentQuestion: [
                    {
                      questionCode: 'remarks_feedback5',
                      question: 'Remarks/feedback',
                      questionName: 'QA_104',
                      questionType: 'textarea',
                      additionalConfig: {
                        rows: 4
                      },
                      option: [{}]
                    },
                    {
                      questionCode: 'escalated',
                      question: 'Escalated to L2',
                      questionType: 'checkbox',
                      questionName: 'QA_139',
                      option: [
                        {
                          label: 'Yes',
                          name: 'escalated'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: 'Not Connected',
          dependentQuestion: [
            {
              questionCode: 'subDisposition',
              question: 'Sub disposition',
              questionName: 'QA_102',
              option: [
                {
                  label: 'RNR'
                },
                {
                  label: 'Not Reachable'
                },
                {
                  label: 'Switch Off'
                },
                {
                  label: 'Wrong Number'
                },
                {
                  label: 'Call Disconnected'
                },
                {
                  label: 'Language Barrier'
                },
                {
                  label: 'Not Interested to share feedback'
                },
                {
                  label: 'Invalid number'
                },
                {
                  label: 'Busy'
                },
                {
                  label: 'Feedback taken'
                }
              ]
            },
            {
              questionCode: 'escalated',
              question: 'Escalated to L2',
              questionType: 'checkbox',
              questionName: 'QA_137',
              option: [
                {
                  label: 'Yes',
                  name: 'escalated'
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return questionArr;
}

export function getDispositionFormQuestions5() {
  const questionArr = [
    {
      questionCode: 'Connectivity',
      question: 'Connectivity',
      questionName: 'QA_2201',
      option: [
        {
          label: 'Connected',
          dependentQuestion: [
            {
              questionCode: 'Customer_name',
              question: 'Customer Name',
              questionName: 'QA_2203',
              questionType: 'textarea',
              additionalConfig: {
                rows: 1
              },
              option: [{}]
            },
            {
              questionCode: 'Customer_Phone_Number',
              question: 'Customer Contact Number',
              questionName: 'QA_2203',
              questionType: 'textarea',
              additionalConfig: {
                rows: 1
              },
              option: [{}]
            },
            {
              questionCode: 'issues',
              question: 'Issue',
              questionName: 'QA_2218',
              option: [
                {
                  label: 'Item missing',
                },
                {
                  label: 'Delivery related',
                },
                {
                  label: 'Refund related'
                },
                {
                  label: 'General inquiry'
                },
                {
                  label: 'Item missing related'
                },
                {
                  label: 'Quality related'
                },
                {
                  label: 'Call dropped'
                },
              ]
            },
            {
              questionCode: 'Agent_Remarks',
              question: 'Agent Remarks',
              questionName: 'QA_2215',
              questionType: 'textarea',
              additionalConfig: {
                rows: 3
              },
              option: [{}]
            },
          ]
        },
       
        {
          label: 'Not Connected'
        },
        {
          label: 'Call Disconnected by customer'
        },
        {
          label: 'Language Barrier'
        },
      ]
    },
    {
      questionCode: 'status',
      question: 'Ticket Status',
      questionName: 'QA_2216',
      option: [
        {
          label: 'Open',   
        },
        {
          label: 'Close',
        },
        {
          label: 'disconnected',
        },
      ]
    },
  ];
  return questionArr;
}

export function getDispositionFormQuestions6() {
  const questionArr = [
    {
      questionCode: 'Connectivity',
      question: 'Connectivity',
      questionName: 'QA_3201',
      option: [
        {
          label: 'Contacted',
        },
       
        {
          label: 'Wrong Number'
        },
        {
          label: 'Call Disconnected by customer'
        },
        {
          label: 'Already Given Feedback'
        },
        {
          label: 'Not Interested to Give Feedback'
        },
        {
          label: 'Language Barrier'
        },
      ]
    },
    {
      questionCode: 'requestCallBack',
      question: 'Customer Request Callback',
      questionName: 'QA_3202',
      option: [
        {
          label: 'Yes',
          dependentQuestion: [
            {
              questionCode: 'callBackTime',
              question: 'At what Time Can we Call ?',
              questionName: 'QA_2218',
              questionType: 'textarea',
              additionalConfig: {
                rows: 1
              },
              option: [{}]
            }
          ]
          
        },
        {
          label: 'No'
        }
      ]
    },
    {
      questionCode: 'guestName',
      question: 'Customer Name',
      questionName: 'QA_3203',
      questionType: 'textarea',
      additionalConfig: {
        rows: 1
      },
      option: [{}]
    },
    {
      questionCode: 'Dining_Mode',
      question: 'Dining Mode',
      questionName: 'QA_3204',
      option: [
        {
          label: 'Dine-In',
        },
        {
          label: 'Take Away',
        },
        
        {
          label: 'Home Delivery'
        },
      ]
    },
    {
      questionCode: 'Delivery_Partner',
      question: 'Which Delivery Partner did you use for your Food order?',
      questionName: 'QA_3205',
      option: [
        {
          label: 'Take Away',
        },
        
        {
          label: 'Delivery (Dot Pe)'
        },
      ]
    },
    {
      questionCode: 'overall_Score',
      question: 'What is your Overall Score on Delivery, Quality and Quantity of your Food order?',
      questionName: 'QA_3206',
      questionType: 'textarea',
      additionalConfig: {
        rows: 1
      },
      option: [{}]
    },
    {
      questionCode: 'Sentiment_Score',
      question:
        'Sentiment Score',
      questionName: 'QA_3207',
      option: [
        {
          label: '1 (Negative Sentiment)'
        },
        {
          label: '2 (Negative Sentiment)'
        },
        {
          label: '3 (Negative Sentiment)'
        },
        {
          label: '4 (Positive Sentiment)'
        },
        {
          label: '5 (Positive Sentiment)'
        }
      ]
    },
    {
      questionCode: 'DineIN_Experience',
      question:
        'How was your Dine - IN Experience ?',
      questionName: 'QA_3208',
      option: [
        {
          label: 'Guest Showed appreciation for the entire Dine-In experience'
        },
        {
          label: 'Over All Dine - In Experience Was Good'
        },
        {
          label: 'Issue - No Parking Space'
        },
        {
          label: 'Issue - Crockry And Cutlery Was Not Clean'
        },
        {
          label: 'Issue - Ambience Was Not Good'
        },
        {
          label: 'Issue - Veg And Non-Veg Served In Same Tray'
        },
        {
          label: 'Issue - Inhouse Drinking Water Does Not Taste Good'
        },
        {
          label: 'Issue - Wash Room and Hand Wash Basin Not Clean'
        },
        {
          label: 'Issue - No Hand Wash/Soap Available'
        },
        {
          label: 'Issue - Finger Bowl not given'
        },
        {
          label: 'Issue - Air Conditioning Not As Per Standard'
        },
        {
          label: 'Issue - Staff Behaviour'
        },
        { 
          label: 'Issue - Language Barrier (Waiters Unable to understand Tamil)'
        },
        {
          label: 'Issue - Covid protocols not followed'
        },
        {
          label: 'Issue - Delay in Table Service'
        },
        {
          label: 'Issue - Billing and Other'
        },
        {
          label: 'Issue - Availability of Items on the Menu'
        },
        {
          label: 'Issue - Food was not served warm at the table'
        },
        {
          label: 'Issue - server was not asking for further items'
        },

      ]
    },
    {
      questionCode: 'Delivery_Experience',
      question:
        'Was there any Issues with the delivery of your Food order?',
      questionName: 'QA_3209',
      option: [
        {
          label: 'Delivery was on time'
        },
        {
          label: 'Issue - Delay In Delivery'
        },
        {
          label: 'Issue - Food Spilled During Delivery'
        },
        {
          label: 'Issue - Short Items Received'
        },
        {
          label: 'Issue - Received Wrong Order'
        },
        {
          label: 'Issue - Received Coldfood'
        },
        {
          label: 'Issue - Staff Behaviour Take-Away/Delivery'
        },
        {
          label: 'Issue - Received Cold Food'
        },
        {
          label: 'Guest showed appreciation for the entire Take- Away/Delivery experience'
        },
        {
          label: 'Covid protocols not followed'
        },
      ]
    },
    {
      questionCode: 'QualityIssues',
      question:
        'Was there any Quality Issues with your Food order?',
      questionName: 'QA_3210',
      option: [
        {
          label: 'Guest showed appreciation for Quality of The Food'
        },
        {
          label: 'No Quality Issues'
        },
        {
          label: 'Issue - Food Not Properly Cooked'
        },
        {
          label: 'Issue - Food Over Cooked'
        },
        {
          label: 'Issue - Food Oily'
        },
        {
          label: 'Issue - Food Spicy'
        },
        {
          label: 'Issue - Food Stale'
        },
        {
          label: 'Issue - Food Bland'
        },
        {
          label: 'Issue - Food Has Bad Odour'
        },
        {
          label: 'Issue - Food Not Properly Packed'
        },
        {
          label: 'Issue - Overall Quality Is Not Good'
        },
        {
          label: 'Issue - Non-Veg In Place Of Veg'
        },
        {
          label: 'Issue - Foreign Particles found in the food'
        },
        {
          label: 'Issue - Taste not like before'
        },
        {
          label: 'Issue - Flavourless'
        },
      ]
    },
    {
      questionCode: 'QuantityIssues',
      question:
        'Was there any Quantity Issues with your Food order?',
      questionName: 'QA_3211',
      option: [
      {
        label: 'Guest showed appreciation for Quatity of The Food'
      },
      {
        label: 'No Quantity Issues'
      },
      {
        label: 'Value For Money'
      },
      {
        label: 'Issue - Over All Quantity Less'
      },
      {
        label: 'Issue - Non-Veg Quantity Less'
      },
      {
        label: 'Issue - Cost Too High For Food Items'
      },
     
      {
        label: 'Issue - Cost is High (Customers who think the price is generally high)'
      }
      ]
    },
    {
      questionCode: 'issue_Item',
      question: 'With Which Item Did You Have An Issue , Specifically?',
      questionName: 'QA_3212',
      questionType: 'textarea',
      additionalConfig: {
        rows: 1
      },
      option: [{}]
    },
    {
      questionCode: 'Recommendation',
      question:
        'Would you recommend Dindigul Thalappakatti to your family and friends?',
      questionName: 'QA_3213',
      option: [
        {
          label: 'Yes, I would Recommend.'
        },
        {
          label: 'No, I would not Recommend.'
        }
      ]
    },
    {
      questionCode: 'Suggestions',
      question: 'Do you have any suggestions to help us improve your experience?',
      questionName: 'QA_3214',
      questionType: 'textarea',
      additionalConfig: {
        rows: 1
      },
      option: [{}]
    },
    {
      questionCode: 'Agent_Remarks',
      question: 'Remarks',
      questionName: 'QA_3215',
      questionType: 'textarea',
      additionalConfig: {
        rows: 3
      },
      option: [{}]
    },
    {
      questionCode: 'escalated',
      question: 'Ticket Status',
      questionName: 'QA_3216',
      option: [
        {
          label: 'open',
          // name : true, 
        },
        {
          label: 'closed',
        },
        
      ]
    },
  ];
  return questionArr;
}