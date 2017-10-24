Rails.application.routes.draw do

  get 'hello_world', to: 'hello_world#index'
  devise_for :users

  root 'reports#index'
  # match "/users/:id/reports", :to => "reports#index", via :get

  resources :users do
    resources :reports
  end

  # old routing
  # resources :users do
  #   resources :reports do
  #     resources :parts, :sections
  #   end
  # end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
