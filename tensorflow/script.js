// // Define a model for linear regression.
// const model = tf.sequential();
// model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
// model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// // Generate some synthetic data for training.
// const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
// const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// // Train the model using the data.
// model.fit(xs, ys, { epochs: 10 }).then(() => {
//   // Use the model to do inference on a data point the model hasn't seen before:
//   model.predict(tf.tensor2d([5], [1, 1])).print(); // Open the browser devtools to see the output
// });

// // 2x3 Tensor
// const shape = [2, 3]; // 可以看做是两行三列组成
// const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
// a.print();
// // Output: [[1 , 2 , 3 ],
// //          [10, 20, 30]]

// // The shape can also be inferred:
// const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
// b.print();
// // Output: [[1 , 2 , 3 ],
// //          [10, 20, 30]]

// // 2阶张量
// // Pass a nested array.
// tf.tensor2d([[1, 2], [3, 4]]).print();
// // Pass a flat array and specify a shape.
// tf.tensor2d([1, 2, 3, 4], [2, 2]).print();
// // ouput
// //    [[1, 2],
// //   [3, 4]]

// // 3阶张量
// // Pass a nested array.
// tf.tensor3d([[[1], [2]], [[3], [4]]]).print();
// // Pass a flat array and specify a shape.
// tf.tensor3d([1, 2, 3, 4], [2, 2, 1]).print();
// // output
// //    [[[1],
// //      [2]],

// //     [[3],
// //      [4]]]

// // 4阶张量
// // Pass a nested array.
// tf.tensor4d([[[[1], [2]], [[3], [4]]]]).print();
// // Pass a flat array and specify a shape.
// tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]).print();
// // output
// //    [[[[1],
// //       [2]],

// //      [[3],
// //       [4]]]]

const fn = async () => {
  const model = tf.sequential();
  model.add(
    tf.layers.conv2d({
      inputShape: [28, 28, 1],
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling',
    })
  );

  model.add(
    tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2],
    })
  );

  model.add(
    tf.layers.conv2d({
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'VarianceScaling',
    })
  );

  model.add(
    tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2],
    })
  );

  model.add(tf.layers.flatten());

  model.add(
    tf.layers.dense({
      units: 10,
      kernelInitializer: 'VarianceScaling',
      activation: 'softmax',
    })
  );

  const LEARNING_RATE = 0.15;
  const optimizer = tf.train.sgd(LEARNING_RATE);

  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });

  const BATCH_SIZE = 64;
  const TRAIN_BATCHES = 100;
  const TEST_BATCH_SIZE = 1000;
  const TEST_ITERATION_FREQUENCY = 5;

  const data = new MnistData();
  await data.load();

  console.log(data);
  for (let i = 0; i < TRAIN_BATCHES; i++) {
    const batch = data.nextTrainBatch(BATCH_SIZE);

    let testBatch;
    let validationData;

    if (i % TEST_ITERATION_FREQUENCY === 0) {
      testBatch = data.nextTestBatch(TEST_BATCH_SIZE);
      validationData = [
        testBatch.xs.reshape([TEST_BATCH_SIZE, 28, 28, 1]),
        testBatch.labels,
      ];
    }

    const history = await model.fit(
      batch.xs.reshape([BATCH_SIZE, 28, 28, 1]),
      batch.labels,
      {
        batchSize: BATCH_SIZE,
        validationData,
        epochs: 1,
      }
    );

    const loss = history.history.loss[0];
    const accuracy = history.history.acc[0];

    console.log(history);
  }
};

fn();

const resultDIV = document.querySelector('#result');
const submitBTN = document.querySelector('#submit');

submitBTN.addEventListener('click', () => {
  const file = document.querySelector('#image-file').files[0];
  if (!file) return (resultDIV.innerText = '请上传文件!');

  // 发送文件的Fetch请求并得到预测结果
  fetch('/predict', { file })
    .then((res) => res.json())
    .then((res) => (resultDIV.innerText = `识别结果:${res.label}`))
    .catch((err) => (resultDIV.innerText = '识别失败,请重试!'));
});
