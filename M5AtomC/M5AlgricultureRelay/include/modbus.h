#ifndef INC_MODBUS_H
#define INC_MODBUS_H

#include "stdint.h"

class MODBUS_CABINET
{
private:
    uint8_t *data_relay_1_on;
    uint8_t *data_relay_1_off;
    uint8_t *data_relay_2_on;
    uint8_t *data_relay_2_off;
    uint8_t *data_relay_3_on;
    uint8_t *data_relay_3_off;
    uint8_t *data_relay_4_on;
    uint8_t *data_relay_4_off;
    uint8_t *data_relay_5_on;
    uint8_t *data_relay_5_off;
    uint8_t *data_relay_6_on;
    uint8_t *data_relay_6_off;
    uint8_t *data_relay_7_on;
    uint8_t *data_relay_7_off;
    uint8_t *data_relay_8_on;
    uint8_t *data_relay_8_off;

public:
    MODBUS_CABINET();
    ~MODBUS_CABINET();
    uint8_t *getDataRelay1ON();
    uint8_t *getDataRelay1OFF();
    uint8_t *getDataRelay2ON();
    uint8_t *getDataRelay2OFF();
    uint8_t *getDataRelay3ON();
    uint8_t *getDataRelay3OFF();
    uint8_t *getDataRelay4ON();
    uint8_t *getDataRelay4OFF();
    uint8_t *getDataRelay5ON();
    uint8_t *getDataRelay5OFF();
    uint8_t *getDataRelay6ON();
    uint8_t *getDataRelay6OFF();
    uint8_t *getDataRelay7ON();
    uint8_t *getDataRelay7OFF();
    uint8_t *getDataRelay8ON();
    uint8_t *getDataRelay8OFF();
};

#endif
