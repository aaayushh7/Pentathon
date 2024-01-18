package main

import (
	
	"github.com/gofiber/fiber/v2"
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatalln("Failed to load environment variables! \n", err.Error())
	}
	initializers.ConnectDB(&config)
}


func main() {
	app := fiber.New()

	
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World 👋!")
	},)

	app.Listen(":8000")


}