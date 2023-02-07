class Machine {
    state = 'OFF';
    transitions = {
        OFF: {
            press() {
                this.state = 'ON'
            }
        },
        ON: {
            press() {
                this.state = 'BLINK'
            }
        },
        BLINK: {
            press() {
                this.state = 'OFF'
            }
        }
    };
    dispatch(actionName) {
        const action = this.transitions[this.state][actionName];
        if (action) {
            action.call(this);
        } else {
            console.log('Invalid action');
        }
    }
};

const flashlight = new Machine();
console.log(flashlight.state);
flashlight.dispatch('press');
console.log(flashlight.state);
flashlight.dispatch('press');
console.log(flashlight.state);

