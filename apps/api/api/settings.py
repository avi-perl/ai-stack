from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="API_",
        env_file=".env",
        extra="ignore",
    )

    app_title: str = "ai-stack api"
    cors_origins: list[str] = ["http://localhost:5173"]


settings = Settings()
