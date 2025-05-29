window.onload = function() {
    ui.init();
    // ui.salaryChange(); // do testów
};

// składki z pensji pracownika
class MonthlyEmployeeIncome {
    grossAmount; // kwota brutto
    monthNum;
    accumulatedYearlyIncomeSum; // zakumulowany dochód od początku roku

    // Składka emerytalna 9.76%
    retirementContribution;
    // Składka rentowa 1.5%
    pensionContribution;
    // Składka chorobowa 2.45%
    sicknessContribution;
    // Suma składek na ubezpieczenie społeczne 
    // finansowane przez pracownika:
    workerSocialContributionSum;
    // Podstawa wymiaru składki na ubezpieczenie zdrowotne:
    baseForHealthContribution;
    // Składka na ubezpieczenie zdrowotne 9%:
    healthContribution;
    // Zaliczka na podatek:
    advanceTax;
    // Składka zdrowotna według stawki 7.75%
    healthAmountToExclude;
    // Kwota netto:
    finalWorkerNetMoney;

    // dochód który jest wynikiem pomniejszenia o koszty uzyskania przychodu 250zł
    icome;


    calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum) {
        if(!accumulatedYearlyIncomeSum) accumulatedYearlyIncomeSum = 0;

        this.grossAmount = grossAmount;
        this.monthNum = monthNum;
        this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

        // Składka emerytalna 9.76%
        this.retirementContribution = grossAmount * 0.0976;
        console.log("Składka emerytalna 9.76%: ", this.retirementContribution);

        // Składka rentowa 1.5%
        this.pensionContribution = grossAmount * 0.015;
        console.log("Składka rentowa 1.5%: ", this.pensionContribution);
 
        // Składka chorobowa 2.45%
        this.sicknessContribution = grossAmount * 0.0245;
        console.log("Składka chorobowa 2.45% ", this.sicknessContribution);


        // Suma składek na ubezpieczenie społeczne 
        // finansowane przez pracownika:
        this.workerSocialContributionSum = this.retirementContribution
                    + this.pensionContribution + this.sicknessContribution;
        console.log("Suma składek na ubezpieczenie społeczne finansowane przez pracownika", this.workerSocialContributionSum);

         
        // Podstawa wymiaru składki na ubezpieczenie zdrowotne:
        this.baseForHealthContribution = grossAmount - this.workerSocialContributionSum;
        console.log("Podstawa wymiaru składki na ubezpieczenie zdrowotne:", this.baseForHealthContribution);

        // Składka na ubezpieczenie zdrowotne 9%:
        this.healthContribution = this.baseForHealthContribution * 0.09;
        console.log("Składka na ubezpieczenie zdrowotne 9%: ", this.healthContribution);


        this.income = Math.ceil(this.baseForHealthContribution - 250);
        console.log("Dochód:", this.income);

        // Zaliczka na podatek:
        if( accumulatedYearlyIncomeSum < 85528
            && this.income + accumulatedYearlyIncomeSum >= 85528) {
            // pierwszy miesiąc gdzie przekroczony jest próg 17% do 85k, 32% ponad 85k
            this.advanceTax = this.income * 0.17;
            console.log("Miesiąc z przekroczeniem pierwszego progu, podatek 17%: ", this.advanceTax);

            const taxAbove85k = ((this.income + accumulatedYearlyIncomeSum) - 85528 ) * 0.32;
            console.log("Podatek powyżej 85528:", taxAbove85k);
            this.advanceTax += taxAbove85k;

        } else if(this.income + accumulatedYearlyIncomeSum >= 85528) {
            this.advanceTax = this.income * 0.32;
            console.log("Kolejny miesiąc z podatkiem 32% (zarobki ponad 85k):", this.advanceTax);
        } else {
            this.advanceTax = (this.income * 0.17) - 43.76;
            console.log("Zaliczka na podatek, pierwszy próg 17%: ", this.advanceTax);
        }
 
        // Składka zdrowotna według stawki 7.75%
        this.healthAmountToExclude = this.baseForHealthContribution * 0.0775;
        console.log("healthAmountToExclude:", this.healthAmountToExclude);

        // ostateczna zaliczka na podatek dochodowy 
        this.advanceTax = Math.floor(this.advanceTax - this.healthAmountToExclude);
        console.log("Zaliczka na podatek dochodowy, wartość końcowa: ", this.advanceTax);

        // Kwota netto:
        this.finalWorkerNetMoney = grossAmount - this.workerSocialContributionSum
                    - this.healthContribution - this.advanceTax;

        console.log("Kwota netto: " + this.finalWorkerNetMoney);
    }
}

const monthlyIncome = new MonthlyEmployeeIncome();



// składki na pracownika płacone przez pracodawcę
class MonthlyEmployerCost {
    grossAmount;
    monthNum;
    accumulatedYearlyIncomeSum;

    // Składka na ubezpieczenie emerytalne 9.76%:
    employerRetirementContribution;

    // Składka na ubezpieczenie rentowe 6.5%:
    employerPensionContribution;

    // Składka na ubezpieczenie wypadkowe 1.67%
    employerAccidentInsurance;

    // Składka na fundusz pracy 2.45%:
    employerWorkFundContribution;

    // Składka na Fundusz Gwarantowanych Świadczeń  Pracowniczych 0.1%
    employerGuaranteedWorkFundContribution;

    // Suma składek pracodawcy:
    employerContributionSum; 

    calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum) {
        this.grossAmount = grossAmount;
        this.monthNum = monthlyIncome;
        this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

        // Składka na ubezpieczenie emerytalne 9.76%:
        this.employerRetirementContribution = grossAmount * 0.0976;;

        // Składka na ubezpieczenie rentowe 6.5%:
        this.employerPensionContribution = grossAmount * 0.065;

        // Składka na ubezpieczenie wypadkowe 1.67%
        this.employerAccidentInsurance = grossAmount * 0.0167;

        // Składka na fundusz pracy 2.45%:
        this.employerWorkFundContribution = grossAmount * 0.0245;

        // Składka na Fundusz Gwarantowanych Świadczeń  Pracowniczych 0.1%
        this.employerGuaranteedWorkFundContribution = grossAmount * 0.001;

        // Suma składek pracodawcy:
        this.employerContributionSum = this.employerRetirementContribution
                    + this.employerPensionContribution
                    + this.employerAccidentInsurance
                    + this.employerWorkFundContribution
                    + this.employerGuaranteedWorkFundContribution;
         
    }
}

const monthlyEmployerCost = new MonthlyEmployerCost();



class Ui {
    salaryInput;
    salaryGross; // kwota brutto

    init() {
        this.salaryInput = document.getElementById("salary");
        this.salaryInput.addEventListener('input', this.salaryChange);
    }

    salaryChange = (e) => {
        if(e) this.salaryGross = e.target.value;

        //this.salaryGross = 2600; // dla testów

        if( !this.salaryGross || isNaN(this.salaryGross)) this.salaryGross = 0;
        console.log(this.salaryGross);

        monthlyIncome.calculate(this.salaryGross, 1, 0);
        monthlyEmployerCost.calculate(this.salaryGross, 1, 0);

        this.updateDom();
    }

    updateDom = () => {
        // Składka emerytalna 9.76%
        this.setValueById("retirementContribution", monthlyIncome.retirementContribution.toFixed(2));
         
        // Składka rentowa 1.5%
        this.setValueById("pensionContribution", monthlyIncome.pensionContribution.toFixed(2));

        // Składka chorobowa 2.45%
        this.setValueById("sicknessContribution", monthlyIncome.sicknessContribution.toFixed(2));
        
        // Suma składek na ubezpieczenie społeczne 
        // finansowane przez pracownika:
        this.setValueById("workerSocialContributionSum", monthlyIncome.workerSocialContributionSum.toFixed(2));
        
        // Podstawa wymiaru składki na ubezpieczenie zdrowotne:
        this.setValueById("baseForHealthContribution", monthlyIncome.baseForHealthContribution.toFixed(2));
        
        // Składka na ubezpieczenie zdrowotne 9%:
        this.setValueById("healthContribution", monthlyIncome.healthContribution.toFixed(2));
        
        // Zaliczka na podatek:
        this.setValueById("advanceTax", monthlyIncome.advanceTax.toFixed(2));

        // Składka zdrowotna według stawki 7.75%
        this.setValueById("healthAmountToExclude", monthlyIncome.healthAmountToExclude.toFixed(2));
        // Kwota netto:
        this.setValueById("finalWorkerNetMoney", monthlyIncome.finalWorkerNetMoney.toFixed(2));
    
    
        /*
        * składki pracodawcy
        */
        // Składka na ubezpieczenie emerytalne 9.76%:
        this.setValueById("employerRetirementContribution", monthlyEmployerCost.employerRetirementContribution.toFixed(2));

        // Składka na ubezpieczenie rentowe 6.5%:
        this.setValueById("employerPensionContribution", monthlyEmployerCost.employerPensionContribution.toFixed(2));

        // Składka na ubezpieczenie wypadkowe 1.67%
        this.setValueById("employerAccidentInsurance", monthlyEmployerCost.employerAccidentInsurance.toFixed(2));

        // Składka na fundusz pracy 2.45%:
        this.setValueById("employerWorkFundContribution", monthlyEmployerCost.employerWorkFundContribution.toFixed(2));

        // Składka na Fundusz Gwarantowanych Świadczeń  Pracowniczych 0.1%
        this.setValueById("employerGuaranteedWorkFundContribution", monthlyEmployerCost.employerGuaranteedWorkFundContribution.toFixed(2));

        // Suma składek pracodawcy:
        this.setValueById("employerContributionSum", monthlyEmployerCost.employerContributionSum.toFixed(2)); 
    }

    setValueById(id, v){
        document.getElementById(id).innerHTML = v;
    }
}

const ui = new Ui();