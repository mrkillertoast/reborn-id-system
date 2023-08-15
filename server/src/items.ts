import { RebornIdSystemEvents } from '@AthenaPlugins/reborn-id-system/shared/viewEvents';
import { BaseItem } from '@AthenaShared/interfaces/item';
import * as Athena from '@AthenaServer/api';
import { IDSystemConfig } from '@AthenaPlugins/reborn-id-system/shared/config';

export const registerItem = async () => {
    await Athena.systems.inventory.factory.upsertAsync(defaultIdCard);
};

const defaultIdCard: BaseItem = {
    name: 'ID Card',
    dbName: 'id-card',
    icon: 'custom-icon',
    maxStack: 1,
    data: {
        lastName: '',
        firstName: '',
        playerGender: '',
        playerDateOfBirth: '',
        idNumber: 0,
    },

    behavior: {
        canDrop: true,
        canTrade: true,
        canStack: false,
        destroyOnDrop: false,
        isClothing: false,
        isCustomIcon: true,
        isToolbar: false,
        isEquippable: false,
        isWeapon: false,
    },
    customEventsToCall: [
        {
            name: IDSystemConfig.ITEM.CUSTOM_EVENT_NAME,
            eventToCall: RebornIdSystemEvents.ServerClient.OPEN_CITYHALL_WEBVIEW,
        },
    ],
    version: 1,
};
