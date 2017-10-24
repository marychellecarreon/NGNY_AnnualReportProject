class CreateReports < ActiveRecord::Migration[5.0]
  def change
    create_table :reports do |t|
      t.string :title
      t.integer :header_colour
      t.integer :footer_colour
      t.string :footer_date
      t.string :footer_company

      t.timestamps
    end
  end
end
