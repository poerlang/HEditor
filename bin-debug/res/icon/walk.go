package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

var arr []string

func walkFunc(path string, info os.FileInfo, err error) error {
	tmp := strings.ToLower(path)
	if strings.Contains(tmp, ".jpg") || strings.Contains(tmp, ".png") {
		arr = append(arr, path)
	}
	return nil
}

func main() {
	//遍历打印所有的文件名
	filepath.Walk("./", walkFunc)
	bytes, _ := json.MarshalIndent(arr, "", "	")
	fmt.Println(string(bytes))
	ioutil.WriteFile("icons.json", bytes, 7777)
}
