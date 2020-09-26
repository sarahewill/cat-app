package router

import (
	"../middleware"
	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/cat", middleware.GetAllFavoriteCats).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/cat", middleware.CreateFavoriteCat).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/undoFavorite/{id}", middleware.UndoFavorite).Methods("DELETE", "OPTIONS")

	return router
}
