Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'home#top'
  get '/after_login', to: 'home#after_login'
  resource :user, only: %i[new create]
end
