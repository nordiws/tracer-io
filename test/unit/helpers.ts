export const defaultBase = {
    name: '',
    description: '',
    active: false,
    created: undefined,
    updated: undefined
}

export const defaultPlant = {
    ...defaultBase,
    name: 'Test Plant',
    date_planted: undefined,
    flower_period: undefined,
    date_harvest: undefined,
    date_stored: undefined,
    plants_qty: 0,
    genetic_origin: '',
    strainId: "",
    harvestId: "",
};

export const defaultHarvest = {
    ...defaultBase,
    observation: '',
    plants: [],
};

export const defaultStrain = {
    ...defaultBase,
    origin: '',
    genteic_origin: '',
    plants: [],
};