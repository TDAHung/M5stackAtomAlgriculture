#include "sensor_data.h"

SENSOR_RS485::SENSOR_RS485()
{
    data_air_humidity_temperature = new uint8_t[8]{0x14, 0x03, 0x00, 0x00, 0x00, 0x02, 0xC6, 0xCE};
    data_soil_PH = new uint8_t[8]{0x01, 0x03, 0x00, 0x06, 0x00, 0x01, 0x64, 0x0B};
    data_soil_temp_and_humi = new uint8_t[8]{0x01, 0x03, 0x00, 0x12, 0x00, 0x02, 0x64, 0x0E};
    data_soil_npk = new uint8_t[8]{0x01, 0x03, 0x00, 0x1E, 0x00, 0x03, 0x65, 0xCD};
    data_soil_conductivity = new uint8_t[8]{0x01, 0x03, 0x00, 0x15, 0x00, 0x01, 0x95, 0xCE};
};

SENSOR_RS485::~SENSOR_RS485()
{
    delete[] data_air_humidity_temperature;
    delete[] data_soil_PH;
    delete[] data_soil_temp_and_humi;
    delete[] data_soil_npk;
    delete[] data_soil_conductivity;
};

uint8_t *SENSOR_RS485::getDataAIR_HUMIDITY_TEMPERATURE()
{
    return data_air_humidity_temperature;
}

uint8_t *SENSOR_RS485::getDataSOIL_PH()
{
    return data_soil_PH;
};

uint8_t *SENSOR_RS485::getDataSOIL_TEMPERATURE_HUMIDITY()
{
    return data_soil_temp_and_humi;
};

uint8_t *SENSOR_RS485::getDataSOIL_NPK()
{
    return data_soil_npk;
};

uint8_t *SENSOR_RS485::getDataSOIL_CONDUCTIVITY()
{
    return data_soil_conductivity;
};
