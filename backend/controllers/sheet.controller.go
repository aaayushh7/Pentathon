package controllers

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func GetSheet(c *fiber.Ctx) error {
	return c.SendString("Hello")
}

func weebhookcall() {

	url := "https://discord.com/api/webhooks/1196466976034410527/kEVE1A5xSMbMuCuLfX9MiQWAAWyWTPpGdAKPmlO27JFJ4pcfUav4Eu6y484h8rvfJ1zR"
	method := "POST"
  
	payload := strings.NewReader(`{`+""+`
	  "content": "**someone just posted**\nhttps://docs.google.com/spreadsheets/d/1gIOfb8v4GJu1PnMBjxgefQkelb1hyQycQeQjqwFZUvQ/edit#gid=0\n\n⚠️⚠️  **Don't share this link with anyone**⚠️⚠️\n"`+""+`}`+""+``)
  
	client := &http.Client {
	}
	req, err := http.NewRequest(method, url, payload)
  
	if err != nil {
	  fmt.Println(err)
	  return
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Cookie", "__cfruid=94ea9ebce1d4e1c45e45a31618b9ff538ed11815-1705578748; __dcfduid=0a2108e4b3bc11eea7caa64caf98001f; __sdcfduid=0a2108e4b3bc11eea7caa64caf98001f8b7f632e9ea6f5abaa3f17f3444264f657ae18718d84d4a75b89fa8fe100c1e7; _cfuvid=rwo3UEvrKuGemXgPwqx_jG3UUg_Dlum9OArnRyO056A-1705578748913-0-604800000")
  
	res, err := client.Do(req)
	if err != nil {
	  fmt.Println(err)
	  return
	}
	defer res.Body.Close()
  
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
	  fmt.Println(err)
	  return
	}
	fmt.Println(string(body))
  }



func errorhandling(c *fiber.Ctx) error {
	return c.SendString("Hello, World 👋!")
}