import { expect, use } from 'chai';
import chaiHttp from 'chai-http/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, before, after, beforeEach } from 'mocha';
import app from '../index.mjs'; // Adjust the path to your server file

// Apply chai-http to chai
const chai = use(chaiHttp);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../models/TreeData.json');

beforeEach(() => {
  const initialData = [
    {
      "1": {
        "label": "root",
        "children": [
          {
            "2": {
              "label": "ant",
              "children": []
            }
          },
          {
            "3": {
              "label": "bear",
              "children": [
                {
                  "4": {
                    "label": "cat",
                    "children": []
                  }
                },
                {
                  "5": {
                    "label": "dog",
                    "children": [
                      {
                        "6": {
                          "label": "elephant",
                          "children": []
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "7": {
              "label": "frog",
              "children": []
            }
          }
        ]
      }
    }
  ];
  fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
});

describe('Tree API', () => {
  it('should GET the entire tree', async () => {
    const response = await chai.request(app).get('/api/tree');
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0]).to.have.property('1');
    expect(response.body[0]['1']).to.have.property('label', 'root');
    expect(response.body[0]['1']).to.have.property('children');
  });

  it('should POST a new node', async () => {
    const newNode = {
      "parent": "8",
      "label": "lion"
    };
    const postResponse = await chai.request(app)
      .post('/api/tree')
      .send(newNode);
    expect(postResponse).to.have.status(201);
    expect(postResponse.body).to.be.an('object');
   });
});
