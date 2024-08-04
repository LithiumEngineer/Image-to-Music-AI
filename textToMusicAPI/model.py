from transformers import AutoProcessor, MusicgenForConditionalGeneration
import scipy
import base64
import io

class Helper:
    @staticmethod
    def process(inputList, seconds, cfg):
        print("hi", inputList, seconds, cfg)
        processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")

        inputs = processor(
            text=inputList,
            padding=True,
            return_tensors="pt",
        )

        audio_values = model.generate(**inputs, do_sample=True, guidance_scale=cfg, max_new_tokens=int(256/5*seconds))

        sampling_rate = model.config.audio_encoder.sampling_rate
        audio_data = audio_values[0, 0].numpy()

        with io.BytesIO() as wav_io:
            scipy.io.wavfile.write(wav_io, rate=sampling_rate, data=audio_data)
            wav_io.seek(0)
            wav_bytes = wav_io.read()

        audio_base64 = base64.b64encode(wav_bytes).decode('utf-8')
        return audio_base64