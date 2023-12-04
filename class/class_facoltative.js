class Calculator {
    #area;
    #perimeter;
    #unitCoeff;

    constructor(h, b, unit = "cm") {
        this.h = h;
        this.b = b;
        this.unit = unit;

        this.#calculateCoeff();
    }

    #calculateCoeff = () => {
        const unitMap = {
            m: 0.01,
            dm: 0.1,
            cm: 1,
            mm: 10,
        }

        if (unitMap[this.unit]) {
            this.#unitCoeff = unitMap[this.unit];
        } else {
            throw new Error("Unit not valid");
        }
    }

    setUnit = (unit) => {
        this.unit = unit;
        this.#calculateCoeff();
        return this;
    }

    area = () => {
        this.#area = `${this.h * this.b * this.#unitCoeff}${this.unit}`;
        return this;
    }

    perimeter = () => {
        this.#perimeter = `${((this.b + this.h) * 2) * this.#unitCoeff}${this.unit}`;
        return this;
    }

    print = (what = "area") => {
        if (what == "area") {
            console.log(this.#area);
        } else if (what == "perimeter") {
            console.log(this.#perimeter);
        }
        return this;
    }
}

const calculator = new Calculator(10, 5, "m");

calculator.area().print("area").setUnit("cm").perimeter().print("perimeter").setUnit("mm").perimeter().print("perimeter");