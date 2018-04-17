export const MODELTEST = {
  "variables": [
    {
      "name": "numEmployees",
      "label": "Number of employees",
      "valueType": "Number",
      "value": "100"
    },
    {
      "name": "numFemaleEmployees",
      "label": "Number of female employes",
      "valueType": "Number",
      "value": "50"
    },
    {
      "name": "numEmployeesInExecBoards",
      "label": "Number of employes being part of executive boards",
      "valueType": "Number",
      "value": "10"
    },
    {
      "name": "numFemaleEmployeesInExecBoards",
      "label": "Number of female employes being part of executive boards",
      "valueType": "Number",
      "value": "6"
    },
    {
      "name": "amountHigherSalary",
      "label": "Amount of higher salary",
      "valueType": "Number",
      "value": "1000"
    },
    {
      "name": "amountLowerSalary",
      "label": "Amount of lower salary",
      "valueType": "Number",
      "value": "600"
    },
    {
      "name": "isAmountSalariesPublic",
      "label": "Is the amount of wages and salaries public?",
      "valueType": "Boolean",
      "value": "1"
    },
    {
      "name": "numPeopleInElaborationPlanning",
      "label": "Number of people being part of the elaboration of the strategic plannig and budget",
      "valueType": "Number",
      "value": "10"
    },
    {
      "name": "numPeople",
      "label": "Number of people in the entity",
      "valueType": "Number",
      "value": "100"
    },
    {
      "name": "numPeopleInApprobationPlanning",
      "label": "Number of people being part of the approbation of the strategic plannig and budget",
      "valueType": "Number",
      "value": "5"
    },
    {
      "name": "numEmploymentContractsIndefinite",
      "label": "Number of employment contracts of indefinite duration in current year",
      "valueType": "Number",
      "value": "95"
    },
    {
      "name": "numContractEmployees",
      "label": "Number of contract employees",
      "valueType": "Number",
      "value": "100"
    },
    {
      "name": "isAppliedFosterFormation",
      "label": "Are measures applied to foster the formation of working people? ",
      "valueType": "Boolean",
      "value": "1"
    },
    {
      "name": "existsReconciliateWorkCommitments",
      "label": "Are there measures to reconcile work with commitments?",
      "valueType": "Boolean",
      "value": "1"
    },
    {
      "name": "consumptionElectricityNonrenewableYear",
      "label": "Electricity consumption from nonrenewable power sources in one year",
      "valueType": "Number",
      "value": "100"
    },
    {
      "name": "consumptionElectricityRenewableYear",
      "label": "Electricity consumption from renewable power sources in one year",
      "valueType": "Number",
      "value": "20"
    },
    {
      "name": "consumtionNaturalGasYear",
      "label": "Natural gas consumption in one year",
      "valueType": "Number",
      "value": "100"
    },
    {
      "name": "consumptionPropaneYear",
      "label": "Propane consumption in one year",
      "valueType": "Number",
      "value": "0"
    },
    {
      "name": "consumptionDieselYear",
      "label": "Diesel fuel consumption in one year",
      "valueType": "Number",
      "value": "10"
    },
    {
      "name": "kmCarYear",
      "label": "kilometers in car in one year",
      "valueType": "Number",
      "value": "2000"
    },
    {
      "name": "kmBusYear",
      "label": "kilometers in bus in one year",
      "valueType": "Number",
      "value": "5000"
    },
    {
      "name": "kmTrainYear",
      "label": "kilometers in train in one year",
      "valueType": "Number",
      "value": "3000"
    },
    {
      "name": "kmAirplaneYear",
      "label": "kilometers in airplane in one year",
      "valueType": "Number",
      "value": "10000"
    },
    {
      "name": "existsImprovementEnviromentManagement",
      "label": "are there measurements for to improve in the enviromental management?",
      "valueType": "Boolean",
      "value": "1"
    },
    {
      "name": "existsIntercooperationWithCompetitors",
      "label": "are there intercooperation with the competitors?",
      "valueType": "Boolean",
      "value": "1"
    },
    {
      "name": "amountOfPurchasesMadeToEntitiesOfSolidarityEconomy",
      "label": "Amount of purchases made to entities of solidarie economy",
      "valueType": "Number",
      "value": "50000"
    },
    {
      "name": "totalExpenditure",
      "label": "Total expenditure",
      "valueType": "Number",
      "value": "500000"
    },
    {
      "name": "staffCosts",
      "label": "Staff costs",
      "valueType": "Number",
      "value": "150000"
    },
    {
      "name": "amountOfIncomeViaSubsidies",
      "label": "Amount of income \"via subsidies\" of public administrations",
      "valueType": "Number",
      "value": "100000"
    },
    {
      "name": "totalIncome",
      "label": "Total Income",
      "valueType": "Number",
      "value": "1000000"
    },
    {
      "name": "amountIncomeGenerated",
      "label": "Amount of income generated by productive or commercial activity",
      "valueType": "Number",
      "value": "900000"
    },
    {
      "name": "amountSupportCommonGoods",
      "label": "Amount contributed over the past year to support networks or associations or other initiatives for the construction of common goods",
      "valueType": "Number",
      "value": "100000"
    },
    {
      "name": "isPartnerCustomerEthicalSolidariesEntities",
      "label": "are we partner or custromer of ethical and solidaries entities of finance?",
      "valueType": "Boolean",
      "value": "1"
    },
    {
      "name": "numTransformationNetworkMember",
      "label": "Number of stable social transformation networks and initiatives of which you are an active member",
      "valueType": "Number",
      "value": "3"
    },
    {
      "name": "numLongTermUnemployedStaff",
      "label": "Number of staff employed during the current year that was a long term unemployed",
      "valueType": "Number",
      "value": "3"
    }
  ],
  "indicators": [
    {
      "name": "FemaleRatio",
      "label": "Female ratio",
      "valueType": "Percentage",
      "formula": "numFemaleEmployees / numEmployees",
      "subIndicators": [],
      "variables": [
        {
          "name": "numEmployees",
          "label": "Number of employees",
          "valueType": "Number",
          "value": "100"
        },
        {
          "name": "numFemaleEmployees",
          "label": "Number of female employes",
          "valueType": "Number",
          "value": "50"
        }
      ],
      "formulaValues": "50 / 100"
    },
    {
      "name": "FemaleRatioEmployeesTakingPartInDecisions",
      "label": "Female ratio employees taking part in  in decisions",
      "valueType": "Percentage",
      "formula": "numFemaleEmployeesInExecBoards / numEmployeesInExecBoards",
      "subIndicators": [],
      "variables": [
        {
          "name": "numEmployeesInExecBoards",
          "label": "Number of employes being part of executive boards",
          "valueType": "Number",
          "value": "10"
        },
        {
          "name": "numFemaleEmployeesInExecBoards",
          "label": "Number of female employes being part of executive boards",
          "valueType": "Number",
          "value": "6"
        }
      ],
      "formulaValues": "6 / 10"
    },
    {
      "name": "DifferenceRatioBetweenHigherLowerSalary",
      "label": "Difference ratio between higher and lower salary",
      "valueType": "Percentage",
      "formula": "(amountHigherSalary - amountLowerSalary) / amountLowerSalary",
      "subIndicators": [],
      "variables": [
        {
          "name": "amountHigherSalary",
          "label": "Amount of higher salary",
          "valueType": "Number",
          "value": "1000"
        },
        {
          "name": "amountLowerSalary",
          "label": "Amount of lower salary",
          "valueType": "Number",
          "value": "600"
        }
      ],
      "formulaValues": "(1000 - 600) / 600"
    },
    {
      "name": "PeopleRatioInElaborationPlanning",
      "label": "People ratio being part of the elaboration of the strategic plannig and budget",
      "valueType": "Percentage",
      "formula": "numPeopleInElaborationPlanning / numPeople",
      "subIndicators": [],
      "variables": [
        {
          "name": "numPeopleInElaborationPlanning",
          "label": "Number of people being part of the elaboration of the strategic plannig and budget",
          "valueType": "Number",
          "value": "10"
        },
        {
          "name": "numPeople",
          "label": "Number of people in the entity",
          "valueType": "Number",
          "value": "100"
        }
      ],
      "formulaValues": "10 / 100"
    },
    {
      "name": "PeopleRatioInApprobationPlanning",
      "label": "People ratio being part of the approbation of the strategic plannig and budget",
      "valueType": "Percentage",
      "formula": "numPeopleInApprobationPlanning / numPeople",
      "subIndicators": [],
      "variables": [
        {
          "name": "numPeople",
          "label": "Number of people in the entity",
          "valueType": "Number",
          "value": "100"
        },
        {
          "name": "numPeopleInApprobationPlanning",
          "label": "Number of people being part of the approbation of the strategic plannig and budget",
          "valueType": "Number",
          "value": "5"
        }
      ],
      "formulaValues": "5 / 100"
    },
    {
      "name": "ContractsIndefiniteRatio",
      "label": "Contracts indefinite ratio",
      "valueType": "Percentage",
      "formula": "numEmploymentContractsIndefinite / numContractEmployees",
      "subIndicators": [],
      "variables": [
        {
          "name": "numEmploymentContractsIndefinite",
          "label": "Number of employment contracts of indefinite duration in current year",
          "valueType": "Number",
          "value": "95"
        },
        {
          "name": "numContractEmployees",
          "label": "Number of contract employees",
          "valueType": "Number",
          "value": "100"
        }
      ],
      "formulaValues": "95 / 100"
    },
    {
      "name": "CO2Emissions",
      "label": "CO2 Emissions",
      "valueType": "Number",
      "formula": "consumptionElectricityNonrenewableYear * 0.24 +\nconsumptionElectricityRenewableYear * 0 +\nconsumtionNaturalGasYear * 2.15 +\nconsumptionPropaneYear * 2.94 +\nconsumptionDieselYear * 2.79 +\nkmCarYear * 0.18 +\nkmBusYear * 0.05 +\nkmTrainYear * 0.028 +\nkmAirplaneYear * 0.12",
      "subIndicators": [],
      "variables": [
        {
          "name": "consumptionElectricityNonrenewableYear",
          "label": "Electricity consumption from nonrenewable power sources in one year",
          "valueType": "Number",
          "value": "100"
        },
        {
          "name": "consumptionElectricityRenewableYear",
          "label": "Electricity consumption from renewable power sources in one year",
          "valueType": "Number",
          "value": "20"
        },
        {
          "name": "consumtionNaturalGasYear",
          "label": "Natural gas consumption in one year",
          "valueType": "Number",
          "value": "100"
        },
        {
          "name": "consumptionPropaneYear",
          "label": "Propane consumption in one year",
          "valueType": "Number",
          "value": "0"
        },
        {
          "name": "consumptionDieselYear",
          "label": "Diesel fuel consumption in one year",
          "valueType": "Number",
          "value": "10"
        },
        {
          "name": "kmCarYear",
          "label": "kilometers in car in one year",
          "valueType": "Number",
          "value": "2000"
        },
        {
          "name": "kmBusYear",
          "label": "kilometers in bus in one year",
          "valueType": "Number",
          "value": "5000"
        },
        {
          "name": "kmTrainYear",
          "label": "kilometers in train in one year",
          "valueType": "Number",
          "value": "3000"
        },
        {
          "name": "kmAirplaneYear",
          "label": "kilometers in airplane in one year",
          "valueType": "Number",
          "value": "10000"
        }
      ],
      "formulaValues": "100 * 0.24 +\n20 * 0 +\n100 * 2.15 +\n0 * 2.94 +\n10 * 2.79 +\n2000 * 0.18 +\n5000 * 0.05 +\n3000 * 0.028 +\n10000 * 0.12"
    },
    {
      "name": "ExpenditureRatioMadeToEntitiesOfSolidarityEconomy",
      "label": "Expenditure ratio made to entities of solidary economy",
      "valueType": "Percentage",
      "formula": "amountOfPurchasesMadeToEntitiesOfSolidarityEconomy / (totalExpenditure - staffCosts)",
      "subIndicators": [],
      "variables": [
        {
          "name": "amountOfPurchasesMadeToEntitiesOfSolidarityEconomy",
          "label": "Amount of purchases made to entities of solidarie economy",
          "valueType": "Number",
          "value": "50000"
        },
        {
          "name": "totalExpenditure",
          "label": "Total expenditure",
          "valueType": "Number",
          "value": "500000"
        },
        {
          "name": "staffCosts",
          "label": "Staff costs",
          "valueType": "Number",
          "value": "150000"
        }
      ],
      "formulaValues": "50000 / (500000 - 150000)"
    },
    {
      "name": "IncomeRatioViaSubsidies",
      "label": "Income ratio via subsidies ",
      "valueType": "Percentage",
      "formula": "amountOfIncomeViaSubsidies / totalIncome",
      "subIndicators": [],
      "variables": [
        {
          "name": "amountOfIncomeViaSubsidies",
          "label": "Amount of income \"via subsidies\" of public administrations",
          "valueType": "Number",
          "value": "100000"
        },
        {
          "name": "totalIncome",
          "label": "Total Income",
          "valueType": "Number",
          "value": "1000000"
        }
      ],
      "formulaValues": "100000 / 1000000"
    },
    {
      "name": "IncomeRatioGenerated",
      "label": "Income ratio generated",
      "valueType": "Percentage",
      "formula": "amountIncomeGenerated / totalIncome",
      "subIndicators": [],
      "variables": [
        {
          "name": "totalIncome",
          "label": "Total Income",
          "valueType": "Number",
          "value": "1000000"
        },
        {
          "name": "amountIncomeGenerated",
          "label": "Amount of income generated by productive or commercial activity",
          "valueType": "Number",
          "value": "900000"
        }
      ],
      "formulaValues": "900000 / 1000000"
    },
    {
      "name": "ExpenditureRatioSupportCommonGoods",
      "label": "Expenditure ratio for to support common goods",
      "valueType": "Percentage",
      "formula": "amountSupportCommonGoods / (totalExpenditure - staffCosts)",
      "subIndicators": [],
      "variables": [
        {
          "name": "totalExpenditure",
          "label": "Total expenditure",
          "valueType": "Number",
          "value": "500000"
        },
        {
          "name": "staffCosts",
          "label": "Staff costs",
          "valueType": "Number",
          "value": "150000"
        },
        {
          "name": "amountSupportCommonGoods",
          "label": "Amount contributed over the past year to support networks or associations or other initiatives for the construction of common goods",
          "valueType": "Number",
          "value": "100000"
        }
      ],
      "formulaValues": "100000 / (500000 - 150000)"
    },
    {
      "name": "LongTermUnemploymentRatio",
      "label": "Ratio of employees that have been recently hired that were previously long term unemployed",
      "valueType": "Percentage",
      "formula": "numLongTermUnemployedStaff / numEmployees",
      "subIndicators": [],
      "variables": [
        {
          "name": "numEmployees",
          "label": "Number of employees",
          "valueType": "Number",
          "value": "100"
        },
        {
          "name": "numLongTermUnemployedStaff",
          "label": "Number of staff employed during the current year that was a long term unemployed",
          "valueType": "Number",
          "value": "3"
        }
      ],
      "formulaValues": "3 / 100"
    },
    {
      "name": "MaleRatio",
      "label": "Male Ratio",
      "valueType": "Percentage",
      "formula": "(numEmployees-numFemaleEmployees) / numEmployees",
      "subIndicators": [],
      "variables": [
        {
          "name": "numEmployees",
          "label": "Number of employees",
          "valueType": "Number",
          "value": "100"
        },
        {
          "name": "numFemaleEmployees",
          "label": "Number of female employes",
          "valueType": "Number",
          "value": "50"
        }
      ],
      "formulaValues": "(100-50) / 100"
    },
    {
      "name": "MaleRatioAgain",
      "label": "Something else for testing",
      "valueType": "Percentage",
      "formula": "1-FemaleRatio",
      "subIndicators": [
        {
          "name": "FemaleRatio",
          "label": "Female ratio",
          "valueType": "Percentage",
          "formula": "numFemaleEmployees / numEmployees",
          "subIndicators": [],
          "variables": [
            {
              "name": "numEmployees",
              "label": "Number of employees",
              "valueType": "Number",
              "value": "100"
            },
            {
              "name": "numFemaleEmployees",
              "label": "Number of female employes",
              "valueType": "Number",
              "value": "50"
            }
          ],
          "formulaValues": "50 / 100"
        }
      ],
      "variables": [],
      "formulaValues": "1-0.5"
    }
  ]
};