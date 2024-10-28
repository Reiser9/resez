export type SubscriptionShort = {
    id: number;
    subscription: string;
};

export type Subscription = SubscriptionShort & {
    price: number;
    canUploadImages: boolean;
    icon: string;
};

export type SubscriptionOfUser = Subscription & {
    subscriptionExpiredDate: Date;
    isSubscriptionPermanent: boolean;
};
