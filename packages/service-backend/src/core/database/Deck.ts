import {HydratedDocument} from "mongoose";
import {Prop, Schema} from "@nestjs/mongoose";
import {TimestampKey} from "../../types";

export type Deck = {
    id : string;
    name : string
    // TODO category m:n relation
    category : string
    // TODO card m:n relation and aggregate card count
    tatalCardCount : number
    // TODO user m:n relation fk
    createUser : string
}

@Schema({ collection: 'Deck', timestamps: true })
export class DeckCollection implements Omit<Deck, TimestampKey> {
    @Prop({ unique: true, required: true })
    id: string;

    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    tatalCardCount: number;

    @Prop({ required: true })
    createUser: string;
}

export type DeckDocument = HydratedDocument<DeckCollection>;