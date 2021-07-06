package main

import (
	"fmt"
	"net/http"
	"log"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>hello, this is golang</h1>")
}

func main() {
	http.HandleFunc("/", indexHandler)
	log.Fatal(http.ListenAndServe(":4000", nil))
}
