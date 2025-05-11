//% color="#4CAF50" weight=10 icon="\u0050" block="pHSensor"
namespace pHSensor {

    const PH_SENSOR_ADDR = 0x54
    const PH_SENSOR_REG = 0x03
    const PH_SENSOR_REG_ADC = 0x04

    /**
     * Returns the current pH value from the sensor.
     * 
     * Note: Before calling this function, you should calibrate the pH sensor to ensure accurate readings.
     * Calibration typically involves using standard buffer solutions (e.g., pH 4.00, 7.00, and 10.00).
     */
    //% blockId=phSensor_ph block="pH"
    //% weight=100
    export function pH(): number {
        let buf = pins.createBuffer(1)
        buf[0] = PH_SENSOR_REG
        pins.i2cWriteBuffer(PH_SENSOR_ADDR, buf, true)
        let result = pins.i2cReadBuffer(PH_SENSOR_ADDR, 4)

        if (result.length != 4) return -1

        return result.getNumber(NumberFormat.Float32LE, 0)
    }
    /**
     * Returns the raw ADC value from the sensor.
     * 
     * The value is a 16-bit unsigned integer in big-endian format.
     */
    //% blockId=phSensor_adc block="pHAdc"
    //% weight=90
    export function pHAdc(): number {
        let buf = pins.createBuffer(1)
        buf[0] = PH_SENSOR_REG_ADC
        pins.i2cWriteBuffer(PH_SENSOR_ADDR, buf, true)
        let result = pins.i2cReadBuffer(PH_SENSOR_ADDR, 2)

        if (result.length != 2) return -1

        return result.getNumber(NumberFormat.UInt16BE, 0)
    }
}
