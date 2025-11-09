from pydantic_settings import BaseSettings
from urllib.parse import quote_plus

class Settings(BaseSettings):
    db_host: str = "localhost"
    db_user: str = "root" 
    db_password: str = "root@000"
    db_name: str = "diet_planner"
    
    @property
    def database_url(self) -> str:
        # Properly encode the password for URL
        encoded_password = quote_plus(self.db_password)
        return f"mysql+mysqlconnector://{self.db_user}:{encoded_password}@{self.db_host}/{self.db_name}"
    
    class Config:
        env_file = ".env"

settings = Settings()