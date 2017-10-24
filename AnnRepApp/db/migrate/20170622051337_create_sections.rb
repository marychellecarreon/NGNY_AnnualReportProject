class CreateSections < ActiveRecord::Migration[5.0]
  def change
    create_table :sections do |t|
      t.string :title
      t.text :content
      t.references :part, foreign_key: true

      t.timestamps
    end
  end
end
