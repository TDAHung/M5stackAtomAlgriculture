/*
 * sensor_data.h
 *
 *  Created on: Oct 23, 2023
 *      Author: Huy Ly
 */

#ifndef INC_SENSOR_DATA_H_
#define INC_SENSOR_DATA_H_

#include <stdint.h>

class SENSOR_RS485
{
private:
    uint8_t *data_air_humidity_temperature;
    uint8_t *data_soil_PH;
    uint8_t *data_soil_temp_and_humi;
    uint8_t *data_soil_npk;
    uint8_t *data_soil_conductivity;

public:
    SENSOR_RS485();
    ~SENSOR_RS485();
    uint8_t *getDataAIR_HUMIDITY_TEMPERATURE();
    uint8_t *getDataSOIL_PH();
    uint8_t *getDataSOIL_TEMPERATURE_HUMIDITY();
    uint8_t *getDataSOIL_NPK();
    uint8_t *getDataSOIL_CONDUCTIVITY();
};

#endif
