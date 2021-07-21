export interface BatchShipment {
    name?: string;
    end_date: Date;
    file: File;
    withdrawable: boolean;
}

export interface B2P {
    enabled?: boolean;
}
