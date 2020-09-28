package middleware

import (
	"../models"
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
)

// DB connection string
// for localhost mongoDB
//const connectionString = "mongodb://localhost:27017"
const connectionString = "mongodb+srv://<DB_NAME>:<DB_PASS>@cluster0.9eynj.mongodb.net/cats?retryWrites=true&w=majority"

// Database Name
const dbName = "test"

// Collection name
const collName = "cats"

// collection object/instance
var collection *mongo.Collection

// create connection with mongo db
func init() {

	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database(dbName).Collection(collName)

	fmt.Println("Collection instance created!")
}
// GetAllFavoriteCats get all the cats route
func GetAllFavoriteCats(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := getAllFavoriteCats()
	json.NewEncoder(w).Encode(payload)
}

// CreateTask create task route
func CreateFavoriteCat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var cat models.Cat
	_ = json.NewDecoder(r.Body).Decode(&cat)
	fmt.Println(cat)
	insertOneFavoriteCat(cat)
	json.NewEncoder(w).Encode(cat)
}

// TaskComplete update task route
func AdoptCat(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var cat models.Cat
	_ = json.NewDecoder(r.Body).Decode(&cat)
	adoptCat(cat, params["id"])
	json.NewEncoder(w).Encode(params["id"])
}
// UndoFavorite undo the complete task route
func UndoFavorite(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	params := mux.Vars(r)
	undoFavorite(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// get all task from the DB and return it
func getAllFavoriteCats() []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		// fmt.Println("cur..>", cur, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
		results = append(results, result)

	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}

// Insert one task in the DB
func insertOneFavoriteCat(cat models.Cat) {
	fmt.Println("getting here", cat)
	insertResult, err := collection.InsertOne(context.Background(), cat)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
}


// cat update method, update cat's name
func adoptCat(cat models.Cat, id string) {
	fmt.Println(cat, id)
	x, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": x}
	update := bson.M{"$set": bson.M{"name": cat.Name}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", result.ModifiedCount)
}

// cat delete
func undoFavorite(cat string) {
	fmt.Println(cat)
	id, _ := primitive.ObjectIDFromHex(cat)
	filter := bson.M{"_id": id}
	d, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Deleted Document", d.DeletedCount)
}
