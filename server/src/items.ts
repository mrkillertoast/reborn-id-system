import { BaseItem } from '@AthenaShared/interfaces/item';
import * as Athena from '@AthenaServer/api';

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
};
