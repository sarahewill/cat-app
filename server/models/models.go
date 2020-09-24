package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Cat struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	URL      string `json:"url"`
	Favorite bool   `json:"favorite"`
}

