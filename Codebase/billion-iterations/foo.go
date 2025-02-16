package main

import (
	"time"
	"fmt"
)

var array [10000]int

func bench() {
	start := time.Now()
	for i := 0; i < 10000; i++ {
		for j := 0; j < 100000; j++ {
			array[i] = array[i] + j
		}
	}
	elapsed := time.Since(start)
	fmt.Printf("%d\n", elapsed.Milliseconds())
}

func main() {
	for i := 0; i < 10; i++ {
		bench()
	}
}
