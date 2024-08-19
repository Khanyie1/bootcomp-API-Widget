document.addEventListener("alpine:init", () => {
    Alpine.data('data', () => {
        return {
            bill: '',
            result: '',
            callPrice: 2.75,
            smsPrice: 0.65,
            updateResult: '',
            type: '',
            prices: {
                call: 2.75,
                sms: 0.65,
            },
            
            async calculateTotal() {
                try {
                    const response = await axios.post('http://localhost:3009/api/Khanyie/phonebill/total', {
                        bill: this.bill
                    });
                    this.result = response.data;
                    setTimeout(() => {
                        this.result = '';
                    }, 5000)
                } catch (error) {
                    console.error(error);
                }
            },

            async updatePrices() {
                try {
                    const response = await axios.post('http://localhost:3009/api/Khanyie/phonebill/price', {
                        type: this.type,
                        price: this.prices[this.type]
                    });
                    this.updateResult = response.data;
                    setTimeout(() => {
                        this.updateResult = ''
                    }, 5000)
                } catch (error) {
                    console.error(error);
                }
            },

            sentence: '',
            sentenceResult: '',

            async analyzeSentence() {
                try {
                    const response = await axios.get(`http://localhost:3009/api/Khanyie/word_game?sentence=${this.sentence}`);
                    this.sentenceResult = response.data;
                    setTimeout(() => {
                        this.sentenceResult = ''
                    }, 5000)
                } catch (error) {
                    console.error(error);
                }
            },

            usage: '',
            available: 0,
            result2: '',

            async checkAirtime() {
                try {
                    const response = await axios.post('http://localhost:3009/api/Khanyie/enough', {
                        usage: this.usage,
                        available: this.available
                    });
                    this.result2 = response.data;

                    setTimeout(() => {
                        this.result2 = ''
                    }, 5000)
                } catch (error) {
                    console.error(error);
                }
            }
        }
    });
});